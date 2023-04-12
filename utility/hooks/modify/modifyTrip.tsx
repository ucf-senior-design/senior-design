import { keys } from "@mui/system"
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
  const { trip, modifyTrip } = useTrip()
  const [modifyTripDetails, setModifyTripDetails] = useState<TModifyTripDetails>({
    destination: trip.destination,
    placeID: "",
    photoURL: trip.photoURL,
    duration: trip.duration,
    layout: trip.layout,
  })

  const { user } = useAuth()

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
        start: new Date(startDate.setHours(0, 0, 0, 0)),
        end: new Date(endDate.setHours(23, 59, 59, 999)),
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

  function updateLayout() {
    let oldIndexToDay = new Map<number, string>()
    let newDayToIndex = new Map<string, number>()

    let oldTripStart = dayjs(trip.duration.start)
    let oldTripEnd = dayjs(trip.duration.end)

    let newTripStart = dayjs(modifyTripDetails.duration.start)
    let newTripEnd = dayjs(modifyTripDetails.duration.end)

    for (let i = 0; i <= oldTripEnd.diff(oldTripStart, "day"); i++) {
      oldIndexToDay.set(i, oldTripStart.add(i, "day").toDate().toDateString())
    }

    for (let i = 0; i <= newTripEnd.diff(newTripStart, "day"); i++) {
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

    let mergedLayout: Array<StoredLocation> = []

    layout.forEach((item) => {
      if (item.key.startsWith("day")) {
        let splitKey = item.key.split(":")
        let bday = parseInt(splitKey[1])
        let keysToPop: Array<string> = []
        newDayToIndex.forEach((day, key) => {
          if (day < bday) {
            mergedLayout.push({
              key: `day:${day}`,
              size: 2,
            })
            keysToPop.push(key)
          }
        })

        keysToPop.forEach((key) => {
          newDayToIndex.delete(key)
        })
      }

      mergedLayout.push(item)
    })

    newDayToIndex.forEach((day, _) => {
      mergedLayout.push({
        key: `day:${day}`,
        size: 2,
      })
    })

    return mergedLayout
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
    updateDuration,
    updateDestination,
    modifyTripDetails,
  }
}
