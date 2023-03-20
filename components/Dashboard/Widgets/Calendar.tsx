import { Button, Paper, Typography } from "@mui/material"
import { useState } from "react"
import Calendar from "react-calendar"
import { useTrip } from "../../../utility/hooks/trip"

export function CalendarWidget() {
  const { trip } = useTrip()
  const [value, onChange] = useState(new Date())

  return (
    <>
      <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "300px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          Trip Date Selection
        </Typography>
        Select your availability:
        <br />
        <br />
        <Calendar
          calendarType="US"
          defaultView="month"
          minDetail="year"
          selectRange={true}
          onChange={onChange}
          value={value}
        />
        <br />
        <Button variant="outlined">submit</Button>
      </Paper>
    </>
  )
}
