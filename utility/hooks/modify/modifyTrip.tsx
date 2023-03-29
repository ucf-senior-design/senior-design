import dayjs from "dayjs"
import { useRouter } from "next/router"
import { useState } from "react"
import { StoredLocation, Trip } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

interface TModifyTripDetails extends Omit<Trip, "uid" | "attendees"> {
  placeID: string
  photoURL: string
}

export interface AttendeeOption {
  type: "team" | "person"
  name: string
  uid: string
}
export default function useModifyTrip() {
  const { trip, modifyTrip, removeExtraDays } = useTrip()
  const [modifyTripDetails, setModifyTripDetails] = useState<TModifyTripDetails>({
    destination: trip.destination,
    placeID: "",
    photoURL: trip.photoURL,
    duration: trip.duration,
    layout: trip.layout,
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

  function maybeModifyTripDetails() {
    const timeDiff =
      modifyTripDetails.duration.end.getTime() - modifyTripDetails.duration.start.getTime() //get the difference in milliseconds
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) //convert milliseconds to days
    let layout: Array<StoredLocation> = []

    let startDiff = Math.floor(
      (trip.duration.start.getTime() - modifyTripDetails.duration.start.getTime()) /
        (1000 * 60 * 60 * 24),
    ) // If Positive, moved earlier
    let oldLayout = trip.layout
    // adds all days to the layout
    for (let i = 0; i < Math.max(1, dayDiff); i++) {
      layout.push({ key: `day:${i}`, size: 3 })
    }
    console.log(oldLayout)
    console.log(layout)

    console.log(Math.max(1, dayDiff))
    setModifyTripDetails({
      ...modifyTripDetails,
      layout: layout,
    })

    //TODO: Copying layout from overlapping days
  }

  function updateLayout() {
    let oldIndexToDay = new Map<number, string>()
    let newDayToIndex = new Map<string, number>()

    let oldTripStart = dayjs(trip.duration.start)
    let oldTripEnd = dayjs(trip.duration.end)

    let newTripStart = dayjs(modifyTripDetails.duration.start)
    let newTripEnd = dayjs(modifyTripDetails.duration.end)

    for (let i = 0; i < oldTripEnd.diff(oldTripStart, "day"); i++) {
      oldIndexToDay.set(i, oldTripStart.add(i, "day").toDate().toDateString())
    }

    for (let i = 0; i < newTripEnd.diff(newTripStart, "day"); i++) {
      newDayToIndex.set(newTripStart.add(i, "day").toDate().toDateString(), i)
    }

    let layout: Array<StoredLocation> = []

    trip.layout.forEach((item) => {
      if (item.key.startsWith("day:")) {
        let splitKey = item.key.split(":")
        let oldIndex = parseInt(splitKey[1])

        let oldDay = oldIndexToDay.get(oldIndex) as string
        let newDay = newDayToIndex.get(oldDay)

        if (newDay !== undefined)
          layout.push({
            key: `day:${newDay}`,
            size: item.size,
          })
        newDayToIndex.delete(oldDay)
      } else {
        layout.push(item)
      }
    })

    newDayToIndex.forEach((day, _) => {
      layout.push({
        key: `day:${day}`,
        size: 2,
      })
    })

    return layout
  }
  async function modify(callback: () => void) {
    if (modifyTripDetails.destination.length === 0 || modifyTripDetails.placeID.length === 0) {
      updateErrorToast("please select a destination.")
      return
    }

    if (user === undefined) {
      updateErrorToast("Please login and try again later.")
      return
    }

    let photoURL = await updatePhotoURL()
    if (photoURL === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    await modifyTrip(
      {
        duration: modifyTripDetails.duration,
        destination: modifyTripDetails.destination,
        photoURL: photoURL,
        layout: updateLayout(),
      },
      () => {
        callback()
      },
    )
  }
  return {
    modify,
    modifyTrip,
    maybeModifyTripDetails,
    updateDuration,
    updateDestination,
    modifyTripDetails,
  }
}
