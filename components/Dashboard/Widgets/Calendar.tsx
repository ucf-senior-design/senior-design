import { Button, Paper, Typography } from "@mui/material";
import { useTrip } from "../../../utility/hooks/trip";
import DateRange from "../../Form/DateRange";

export function CalendarWidget() {
  const { trip } = useTrip()
  const handleUpdate = () => {
    console.log('Update');
  };

  return (
    <>
      <Paper sx={{ padding: "20px", width: "100vw", maxWidth: "300px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          Trip Date Selection
        </Typography>
        Select your availability:
        <br />
        <br />
        <DateRange 
        startDate = {new Date("03/19/2023")}
        endDate = {new Date("03/20/2023")}
        updateDates = {handleUpdate}/>

        <br />
        <Button variant="outlined">submit</Button>
      </Paper>
    </>
  )
}
