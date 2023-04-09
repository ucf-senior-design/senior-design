import { Button, Paper, Typography } from "@mui/material"
import { Calendar, DatePicker } from "antd"
import dayjs, { Dayjs } from "dayjs"
import useAvailabillity from "../../../utility/hooks/availabillity"
import { useTrip } from "../../../utility/hooks/trip"
import { Availabillity } from "../../../utility/types/trip"

export function CalendarWidget({ availability }: { availability: Availabillity }) {
  const { dates } = useAvailabillity(availability)
  interface calInfo {
    usernames: string[]
    date: Date
  }

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

  function createDateHash(month: number, day: number) {
    return `${month}:${day}`
  }
  const getMonthData = (dayjs: Dayjs) => {}

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value)
    return null
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = dates

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
