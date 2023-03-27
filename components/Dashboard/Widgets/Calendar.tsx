import { Button, Paper, Typography } from "@mui/material"
import { Calendar, DatePicker } from "antd"

export function CalendarWidget() {
  const { RangePicker } = DatePicker

  return (
    <>
      <Paper sx={{ padding: "20px", width: "100vw", maxWidth: "300px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          Trip Date Selection
        </Typography>
        <br />
        Current group availability:
        <Calendar fullscreen={false} />
        <p>Input an availability window:</p>
        <p>
          <RangePicker />
        </p>
        <Button variant="outlined">submit</Button>
      </Paper>
    </>
  )
}
