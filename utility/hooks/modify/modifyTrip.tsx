import { useRouter } from "next/router"
import { useState } from "react"
import { API_URL } from "../../constants"
import { createFetchRequestOptions } from "../../fetch"
import { StoredLocation, Trip } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

interface TModifyTripDetails extends Omit<Trip, "uid" | "attendees" | "layout"> {
  placeID: string
  photoURL: string
}

export interface AttendeeOption {
  type: "team" | "person"
  name: string
  uid: string
}
export default function useModifyTrip() {
  const { trip, modifyTrip } = useTrip()
  const [modifyTripDetails, setModifyTripDetails] = useState<TModifyTripDetails>({
    destination: trip.destination,
    placeID: "",
    photoURL: trip.photoURL,
    duration: trip.duration,
  })

  const { user } = useAuth()
  const router = useRouter()
  const { updateErrorToast } = useScreen()

  function updateDestination(placeID: string, city: string) {
    setModifyTripDetails({
      ...modifyTripDetails,
      placeID: placeID,
      destination: city,
    })
  }

  function updateDuration(startDate: Date, endDate: Date) {
    setModifyTripDetails({
      ...modifyTripDetails,
      duration: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    })
  }

  async function updatePhotoURL() {
    if (modifyTripDetails.placeID.length === 0) {
      return undefined
    }

    if (modifyTripDetails.destination === trip.destination) {
      return trip.photoURL
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    let response = await fetch(`${API_URL}places/${modifyTripDetails.placeID}`, {
      method: "GET",
    })
    if (response.ok) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1400&photoreference=${await response.text()}&key=${
        process.env.NEXT_PUBLIC_PLACES_KEY
      }`
    }
    return undefined
  }

  async function maybeModifyTripDetails() {
    if (modifyTripDetails.destination.length === 0 || modifyTripDetails.placeID.length === 0) {
      updateErrorToast("please select a destination.")
      return
    }

    if (user === undefined) {
      updateErrorToast("Please login and try again later.")
      return
    }

    const timeDiff =
      modifyTripDetails.duration.end.getTime() - modifyTripDetails.duration.start.getTime() //get the difference in milliseconds
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) //convert milliseconds to days
    let layout: Array<StoredLocation> = []

    let startDiff = Math.floor(
      (trip.duration.start.getTime() - modifyTripDetails.duration.start.getTime()) /
        (1000 * 60 * 60 * 24),
    ) // If Positive, moved earlier

    // adds all days to the layout
    for (let i = 0; i < Math.max(1, dayDiff); i++) {
      layout.push({ key: `day:${i}`, size: 3 })
    }

    //TODO: Copying layout from overlapping days
    trip.layout = layout
  }

  async function modify(callback: (isSuccess: Response) => void) {
    let newURL = updatePhotoURL()

    setModifyTripDetails({
      ...modifyTripDetails,
      photoURL: newURL.toString(),
    })

    console.log(modifyTripDetails.photoURL)
    const options = createFetchRequestOptions(
      JSON.stringify({
        duration: {
          start: modifyTripDetails.duration.start,
          end: modifyTripDetails.duration.end,
        },
        destination: modifyTripDetails.destination,
        photoURL: modifyTripDetails.photoURL,
      }),
      "PUT",
    )
    const response = await fetch(`${API_URL}/trip/${trip.uid}/modify`, options)
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    await modifyTrip(
      {
        duration: modifyTripDetails.duration,
        destination: modifyTripDetails.destination,
        photoURL: modifyTripDetails.photoURL,
      },
      () => {
        callback(response)
      },
    )
    maybeModifyTripDetails()
  }
  return {
    modify,
    modifyTrip,
    maybeModifyTripDetails,
    updateDuration,
    updateDestination,
  }
}
