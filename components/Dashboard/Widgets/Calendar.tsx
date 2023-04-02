import { Button, Paper, Typography } from "@mui/material"
import { Calendar, DatePicker } from "antd"
import type { Dayjs } from "dayjs"
import { useTrip } from "../../../utility/hooks/trip"

export function CalendarWidget() {
  const { trip } = useTrip()
  const { RangePicker } = DatePicker

  interface calInfo {
    username: string
    date: Date
  }

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

  const getMonthData = (value: Dayjs) => {}

  const getListData = (value: Dayjs) => {
    const listData: calInfo[] = []
    const availability_1 = [
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 4],
      [3, 5],
      [3, 10],
    ]
    const availability_2 = [
      [2, 10],
      [2, 13],
      [3, 11],
      [3, 2],
      [3, 3],
      [3, 5],
      [3, 11],
    ]

    for (let i = 0; i < availability_1.length; i++) {
      if (value.date() === availability_1[i][1] && value.month() === availability_1[i][0]) {
        let dateData = {} as calInfo
        const date = new Date()
        date.setMonth(availability_1[i][0])
        date.setDate(availability_1[i][1])

        dateData.date = date
        dateData.username = "username"
        listData.push(dateData)
      }
    }
    for (let i = 0; i < availability_2.length; i++) {
      if (value.date() === availability_2[i][1] && value.month() === availability_2[i][0]) {
        let dateData = {} as calInfo
        const date = new Date()
        date.setMonth(availability_2[i][0])
        date.setDate(availability_2[i][1])

        dateData.date = date
        dateData.username = "test"
        listData.push(dateData)
      }
    }
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
        {listData.map((item) => (
          <div
            key={item.username}
            style={{ width: "100%", height: "5px", backgroundColor: stringToColor(item.username) }}
          ></div>
        ))}
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
