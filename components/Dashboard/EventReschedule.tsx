import { Button, Paper, Typography } from "@mui/material"
import { DatePicker } from "antd"

export default function EventReschedule({ event }: { event: Event }) {
  const { RangePicker } = DatePicker

  return (
    <>
      <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "400px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center", padding:"3 em" }}>
          Reschedule Event
        </Typography>
        <p>Please select start and end date and time to re-schedule the selected event to:</p>
        <p><RangePicker showTime /></p>
        <p><Button variant="outlined">submit</Button></p>
      </Paper>
    </>
  )
}
