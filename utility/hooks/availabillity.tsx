import { Availabillity, Duration } from "../types/trip"
import React from "react"
import { API_URL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import suggestion from "./suggestion"
import { useTrip } from "./trip"
import { useScreen } from "./screen"
import { useAuth } from "./authentication"

export default function Availabillity(a: Availabillity) {
  const { trip } = useTrip()
  const { user } = useAuth()
  const { updateErrorToast } = useScreen()
  const [availabillity, setAvailabillity] = React.useState(a)
  const BASE_ERROR = "try again later"

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

  return { updateAvailabillity }
}
