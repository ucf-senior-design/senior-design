import dayjs from "dayjs"
import React from "react"
import { API_URL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import { Availabillity, Duration } from "../types/trip"
import { useAuth } from "./authentication"
import { useScreen } from "./screen"
import { useTrip } from "./trip"

export default function useAvailabillity(a: Availabillity) {
  const { trip } = useTrip()
  const { user } = useAuth()
  const { updateErrorToast } = useScreen()
  const [availabillity, setAvailabillity] = React.useState(a)
  const [dates, setDates] = React.useState<Map<string, Array<string>>>()
  const BASE_ERROR = "try again later"

  function createDateHash(month: number, day: number) {
    return `${month}:${day}`
  }
  function storeDates() {
    let dateMap = new Map<string, Array<string>>()

    availabillity.availabillities.forEach((a, user) => {
      a.dates.forEach((duration) => {
        for (
          let current = dayjs(duration.start);
          current <= dayjs(duration.end);
          current.add(1, "day")
        ) {
          let arrayOfUsers = dateMap.get(createDateHash(current.month(), current.day())) ?? []
          arrayOfUsers.push(user)
          dateMap.set(createDateHash(current.month(), current.day()), arrayOfUsers)
        }
      })
    })

    setDates(dateMap)
  }
  async function updateAvailabillity(dates: Array<Duration>) {
    if (user === undefined || availabillity.availabillities.get(user.uid) === undefined) {
      updateErrorToast(BASE_ERROR)
      return
    }

    const options = createFetchRequestOptions(JSON.stringify({ dates: dates }), "PUT")
    await fetch(`${API_URL}trip/${trip.uid}/availabillity/${availabillity.uid}/add`, options).then(
      async (response) => {
        if (response.ok) {
          let updateAvail = new Map(availabillity.availabillities)
          updateAvail.set(user.uid, {
            uid: user.uid,
            dates: dates,
          })
        } else {
          updateErrorToast(await response.text())
        }
      },
    )
  }

  return { updateAvailabillity, dates }
}
