import { useRouter } from "next/router"
import React from "react"
import { useState } from "react"
import { API_URL } from "../../constants"
import { createFetchRequestOptions } from "../../fetch"
import { getAttendeeOptionsArray, createAttendeesArray } from "../../helper"
import { StoredLocation, Trip } from "../../types/trip"
import { useAuth } from "../authentication"
import { useFriend } from "../friends"
import { useScreen } from "../screen"

interface TCreateTrip extends Omit<Trip, "uid" | "attendees"> {
  attendees: Array<AttendeeOption>
  placeID: string
  attendeeOptions: Array<AttendeeOption>
}

export interface AttendeeOption {
  type: "team" | "person"
  name: string
  uid: string
}
export default function useCreateTrip() {
  const [createTrip, setCreateTrip] = useState<TCreateTrip>({
    destination: "",
    placeID: "",
    attendees: [],
    photoURL: "",
    duration: {
      start: new Date(),
      end: new Date(),
    },
    attendeeOptions: [],
    layout: [],
  })

  const { user } = useAuth()
  const router = useRouter()
  const { updateErrorToast } = useScreen()
  const { friendList, addFriendOptions } = useFriend()

  React.useEffect(() => {
    let friends = addFriendOptions()
    let updatedOptions = Array.from(createTrip.attendeeOptions)

    createTrip.attendeeOptions.forEach((option) => {
      if (friends.has(option.uid)) {
        friends.delete(option.uid)
      }
    })

    friends.forEach((friend) => {
      updatedOptions.push(friend)
    })

    setCreateTrip({
      ...createTrip,
      attendeeOptions: updatedOptions,
    })
  }, [friendList])

  function updateDestination(placeID: string, city: string) {
    setCreateTrip({
      ...createTrip,
      placeID: placeID,
      destination: city,
    })
  }

  function addAttendeeOption(type: "person" | "team", uid: string, name: string) {
    let newOptions = new Set(createTrip.attendeeOptions)
    let newAttendees = new Set(createTrip.attendees)
    let attendee: AttendeeOption = {
      type: type,
      uid: uid,
      name: name,
    }

    newOptions.add(attendee)
    newAttendees.add(attendee)

    setCreateTrip({
      ...createTrip,
      attendees: getAttendeeOptionsArray(newAttendees),
      attendeeOptions: getAttendeeOptionsArray(newOptions),
    })
  }

  function updateAttendees(attendees: Array<AttendeeOption>) {
    setCreateTrip({
      ...createTrip,
      attendees: getAttendeeOptionsArray(new Set(attendees)),
    })
  }

  function updateDuration(startDate: Date, endDate: Date) {
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(23, 59, 59, 999)

    setCreateTrip({
      ...createTrip,
      duration: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    })
  }

  async function getPhotoURL() {
    if (createTrip.placeID.length === 0) {
      return undefined
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    let response = await fetch(`${API_URL}places/${createTrip.placeID}`, {
      method: "GET",
    })
    if (response.ok) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1400&photoreference=${await response.text()}&key=${
        process.env.NEXT_PUBLIC_PLACES_KEY
      }`
    }
    return undefined
  }

  async function maybeCreateTrip() {
    if (createTrip.destination.length === 0 || createTrip.placeID.length === 0) {
      updateErrorToast("please select a desintation.")
      return
    }

    let photoURL = await getPhotoURL()

    if (photoURL === undefined) {
      updateErrorToast("cannot get location details at this time.")
      return
    }

    if (user === undefined) {
      updateErrorToast("Please login and try again later.")
      return
    }

    let attendees = createAttendeesArray(createTrip.attendees)
    attendees.push(user.uid)

    const timeDiff = createTrip.duration.end.getTime() - createTrip.duration.start.getTime() //get the difference in milliseconds
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) //convert milliseconds to days
    let layout: Array<StoredLocation> = []

    // adds all days to the layout
    for (let i = 0; i < Math.max(1, dayDiff); i++) {
      layout.push({ key: `day:${i}`, size: 3 })
    }

    const options = createFetchRequestOptions(
      JSON.stringify({
        duration: {
          start: createTrip.duration.start,
          end: createTrip.duration.end,
        },
        photoURL: photoURL,
        destination: createTrip.destination,
        attendees: attendees,
        layout: layout,
      }),
      "POST",
    )

    const response = await fetch(`${API_URL}/trip`, options)

    if (response.ok) {
      let newTrip = await response.json()

      router.push(`/trip/`, {
        query: { id: newTrip.uid },
        pathname: "/dashboard/trip/",
      })
    } else {
      updateErrorToast("cannot create trip at this time.")
    }
  }

  let attendeeOptions = createTrip.attendeeOptions

  return {
    createTrip,
    updateAttendees,
    updateDuration,
    updateDestination,
    attendeeOptions,
    maybeCreateTrip,
    addAttendeeOption,
  }
}
