import { useRouter } from "next/router"
import { useState } from "react"
import { API_URL } from "../../constants"
import { createFetchRequestOptions } from "../../fetch"
import { StoredLocation, Trip } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

interface TModifyTrip extends Omit<Trip, "uid" | "attendees" | "layout"> {
  placeID: string
}

export interface AttendeeOption {
  type: "team" | "person"
  name: string
  uid: string
}
export default function useModifyTrip() {
  const { trip } = useTrip()
  const [modifyTrip, setModifyTrip] = useState<TModifyTrip>({
    destination: trip.destination,
    placeID: "",
    photoURL: trip.photoURL,
    duration: trip.duration,
  })

  const { user } = useAuth()
  const router = useRouter()
  const { updateErrorToast } = useScreen()

  function updateDestination(placeID: string, city: string) {
    setModifyTrip({
      ...modifyTrip,
      placeID: placeID,
      destination: city,
    })
  }

  function updateDuration(startDate: Date, endDate: Date) {
    setModifyTrip({
      ...modifyTrip,
      duration: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    })
  }

  async function getPhotoURL() {
    if (modifyTrip.placeID.length === 0) {
      return undefined
    }

    if (modifyTrip.destination === trip.destination) {
      return trip.photoURL
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    let response = await fetch(`${API_URL}places/${modifyTrip.placeID}`, {
      method: "GET",
    })
    if (response.ok) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1400&photoreference=${await response.text()}&key=${
        process.env.NEXT_PUBLIC_PLACES_KEY
      }`
    }
    return undefined
  }

  async function maybeModifyTrip() {
    if (modifyTrip.destination.length === 0 || modifyTrip.placeID.length === 0) {
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

    const timeDiff = modifyTrip.duration.end.getTime() - modifyTrip.duration.start.getTime() //get the difference in milliseconds
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) //convert milliseconds to days
    let layout: Array<StoredLocation> = []

    // adds all days to the layout
    for (let i = 0; i < Math.max(1, dayDiff); i++) {
      layout.push({ key: `day:${i}`, size: 3 })
    }

    const options = createFetchRequestOptions(
      JSON.stringify({
        duration: {
          start: modifyTrip.duration.start,
          end: modifyTrip.duration.end,
        },
        photoURL: modifyTrip.photoURL,
        destination: modifyTrip.destination,
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
      updateErrorToast("cannot modify trip at this time.")
    }
  }

  return {
    modifyTrip,
    maybeModifyTrip,
    updateDuration,
    updateDestination,
  }
}
