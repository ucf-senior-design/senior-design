import { Button, Paper, Typography } from "@mui/material"
import { DatePicker } from "antd"

export function EventReschedule() {
  const { RangePicker } = DatePicker

  return (
    <>
      <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "400px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          Reschedule Event
        </Typography>
        <br />
        Please select start and end date and time to re-schedule the selected event to:
        <br />
        <br />
        <RangePicker showTime />
        <br />
        <br />
        <Button variant="outlined">submit</Button>
        <br />
      </Paper>
    </>
  )
}
