import { Button, Paper, Typography } from "@mui/material"
import { Calendar, DatePicker } from "antd"
import type { Dayjs } from "dayjs"
import { useTrip } from "../../../utility/hooks/trip"
import { Availabillity as availType } from "../../../utility/types/trip"

export function CalendarWidget({ availability }: { avaliability: availType }) {
  interface calInfo {
    usernames: string[]
    date: Date
  }

  const { trip } = useTrip()
  const { RangePicker } = DatePicker

  function stringToColor(string: string): string {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = "#"

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  const getMonthData = (dayjs: Dayjs) => {}

  const getListData = (dayjs: Dayjs) => {
    const listData: calInfo[] = []
    let data = availability

    let dateMap = new Map<string, Array<string>>()

    data.forEach((availability) => {
      let user = { availability }
      availability.forEach((duration) => {
        for (let current = duration.start; current <= duration.end; current.add(1, "day")) {
          let arrayOfUsers = availability.get()
          arrayOfUsers.push(user)
          dateMap.set("${current.getMonth()}:${current.getDay()}", arrayOfUsers)
        }
      })
    })

    dateMap.forEach((value: string[], key: string) => {
      if ("${dayjs.month()}:${dayjs.date()}" == key) {
        let dateData = {} as calInfo
        const date = new Date()
        date.setMonth(Number(key[0]))
        date.setDate(Number(key[2]))

        dateData.date = date
        dateData.usernames = value
        listData.push(dateData)
      }
    })

    return listData || []
  }

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value)
    return null
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)

    return (
      <>
       {/* this is wrong but don't know how to fix and commented out so it would push */}
        {/* {listData.forEach((item.usernames) => {
          item.usernames.forEach((username) => {
            <div
            key={username}
            style={{ width: "100%", height: "5px", backgroundColor: stringToColor(item.username) }}
          ></div>
          })
          })} */}
      </>
    )
  }

  return (
    <>
      <Paper sx={{ padding: "20px", width: "100vw", maxWidth: "500px", lineHeight: "2.5em" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center", padding: "1" }}>
          Trip Date Selection
        </Typography>
        Current group availability:
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        Input an availability window:
        <RangePicker />
        <p>
          <Button variant="outlined">submit</Button>
        </p>
      </Paper>
    </>
  )
}
