import { useRouter } from "next/router"
import React from "react"
import { useState } from "react"
import { createFetchRequestOptions } from "../fetch"
import { Trip } from "../types/trip"
import { useAuth } from "./authentication"
import { useFriend } from "./friends"
import { useScreen } from "./screen"

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
  })

  const { friendList } = useFriend()
  const { user } = useAuth()
  const router = useRouter()
  const { updateErrorToast } = useScreen()

  React.useEffect(() => {
    createAttendeeOptions()
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

  function getAttendeeOptionsArray(list: Set<AttendeeOption>) {
    let tAttendees: Array<AttendeeOption> = []
    list.forEach((a) => {
      tAttendees.push(a)
    })
    return tAttendees
  }

  function createAttendeesArray() {
    let tAttendees: Array<string> = []
    createTrip.attendees.forEach((a) => {
      if (a.type === "team") {
        // TODO Get all the people in the team
        tAttendees.push(a.uid)
      } else {
        tAttendees.push(a.uid)
      }
    })
    return tAttendees
  }

  function updateAttendees(attendees: Array<AttendeeOption>) {
    setCreateTrip({
      ...createTrip,
      attendees: getAttendeeOptionsArray(new Set(attendees)),
    })
  }

  function updateDuration(startDate: Date, endDate: Date) {
    setCreateTrip({
      ...createTrip,
      duration: {
        start: startDate,
        end: endDate,
      },
    })
  }

  function createAttendeeOptions() {
    let options: Array<AttendeeOption> = []

    if (friendList !== undefined) {
      friendList.forEach((friendship) => {
        options.push({
          name: friendship.friend.name ?? "no name",
          uid: user?.uid === friendship.pairing[0] ? friendship.pairing[1] : friendship.pairing[0],
          type: "person",
        })
      })
    }

    setCreateTrip({ ...createTrip, attendeeOptions: options })
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    if (createTrip.destination.length === 0 || createTrip.placeID.length === 0) {
      updateErrorToast("please select a desintation.")
      return
    }

    let photoURL = await getPhotoURL()

    if (photoURL === undefined) {
      updateErrorToast("cannot create trip at this time.")
      return
    }

    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }
    let attendees = createAttendeesArray()
    attendees.push(user.uid)

    const options = createFetchRequestOptions(
      JSON.stringify({
        duration: {
          start: createTrip.duration.start,
          end: createTrip.duration.end,
        },
        photoURL: photoURL,
        destination: createTrip.destination,
        attendees: attendees,
      }),
      "POST",
    )

    const response = await fetch(`${API_URL}/trip`, options)

    if (response.ok) {
      let newTrip = await response.json()

      router.push(`/trip/`, {
        query: { id: newTrip.uid },
        pathname: "dashboard/trip/",
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
