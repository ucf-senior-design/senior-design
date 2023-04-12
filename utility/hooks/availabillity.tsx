import { Box } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import React from "react"
import { API_URL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import { stringToColor } from "../helper"
import { Availabillity } from "../types/trip"
import { useAuth } from "./authentication"
import { useScreen } from "./screen"
import { useTrip } from "./trip"

export default function useAvailabillity(availabillity: Availabillity) {
  const { trip } = useTrip()
  const { user } = useAuth()
  const { updateErrorToast } = useScreen()
  const [dates, setDates] = React.useState<Map<string, Array<string>>>()
  const [duration, setDuration] = React.useState({
    start: new Date(),
    end: new Date(),
  })
  const BASE_ERROR = "try again later"

  React.useEffect(() => {
    let map = storeDates()

    setDates(map)
  }, [])
  function updateDuration(startDate: Date, endDate: Date) {
    setDuration({
      start: new Date(startDate.setHours(0, 0, 0, 0)),
      end: new Date(endDate.setHours(23, 59, 59, 999)),
    })
  }

  function createDateHash(month: number, day: number) {
    return `${month}:${day}`
  }
  function storeDates() {
    let dateMap = new Map<string, Array<string>>()
    availabillity.availabillities.forEach((a, user) => {
      a.dates.forEach((duration) => {
        let current = dayjs(duration.start)
        let end = dayjs(duration.end)

        while (current <= end) {
          let arrayOfUsers = dateMap.get(createDateHash(current.month(), current.date())) ?? []
          arrayOfUsers.push(user)
          dateMap.set(
            createDateHash(current.month(), current.date()),
            Array.from(new Set(Array.from(arrayOfUsers))),
          )
          current = current.add(1, "day")
        }
      })
    })

    return dateMap
  }

  function dateCellRender(value: Dayjs) {
    if (dates === undefined) return <></>

    const users = dates.get(createDateHash(value.month(), value.date())) ?? []
    if (users.length === 0) {
      return <></>
    }

    return (
      <Box sx={{ gap: "3px", margin: 0, padding: 0 }}>
        {users.map((username) => {
          return (
            <div
              key={`${value.toDate()}:${username}`}
              style={{
                width: "100%",
                height: "5px",
                marginBottom: "3px",
                backgroundColor: stringToColor(username),
              }}
            ></div>
          )
        })}
      </Box>
    )
  }

  async function updateAvailabillity(callback: (isSuccess: boolean) => void) {
    if (user === undefined || availabillity.availabillities.get(user.uid) === undefined) {
      updateErrorToast(BASE_ERROR)
      return
    }

    let newDates = availabillity.availabillities.get(user.uid)?.dates ?? []
    newDates.push(duration)

    const options = createFetchRequestOptions(
      JSON.stringify({ dates: newDates, uid: user?.uid ?? "" }),
      "PUT",
    )
    await fetch(`${API_URL}trip/${trip.uid}/availabillity/${availabillity.uid}/add`, options).then(
      async (response) => {
        if (response.ok) {
          let updateAvail = new Map(availabillity.availabillities)
          updateAvail.set(user.uid, {
            uid: user.uid,
            dates: newDates,
          })
          callback(true)
        } else {
          updateErrorToast(await response.text())
        }
      },
    )
  }

  return { updateAvailabillity, dates, duration, updateDuration, dateCellRender }
}
