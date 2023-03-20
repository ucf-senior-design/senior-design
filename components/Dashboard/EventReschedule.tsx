import { Paper, Typography } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { StaticDateTimePicker } from "@mui/x-date-pickers/"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export function EventReschedule() {
  return (
    <>
      <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "400px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          Reschedule Event
        </Typography>
        Please select date and time to change selected event to:
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker />
        </LocalizationProvider>
        <br />
      </Paper>
    </>
  )
}
