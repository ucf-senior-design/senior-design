import { Button, Paper, Typography } from "@mui/material"
import { maxHeight, minWidth } from "@mui/system"
import { Calendar } from "antd"
import React from "react"
import theme from "../../../styles/theme/Theme"
import useAvailabillity from "../../../utility/hooks/availabillity"
import { useTrip } from "../../../utility/hooks/trip"
import { Availabillity } from "../../../utility/types/trip"
import { BackdropModal } from "../../BackdropModal"
import CreateBox from "../../Create/CreateBox"
import DateRange from "../../Form/DateRange"

export function CalendarWidget({ availability }: { availability: Availabillity }) {
  const { dateCellRender, updateDuration, updateAvailabillity } = useAvailabillity(availability)
  const [showAddAvail, setShowAvail] = React.useState(false)
  const { trip } = useTrip()

  return (
    <>
      <Paper
        sx={{
          padding: "20px",
          width: "100%",
          minWidth: "300px",
          maxHeight: "500px",
          overflowY: "auto",
          height: "100%",
          margin: "10px",
        }}
      >
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center", fontSize: "20px" }}>
          {availability.title}
        </Typography>
        <Calendar dateCellRender={(date) => dateCellRender(date)} />
        <Button onClick={() => setShowAvail(true)}> Add Availabillity</Button>
        <div style={$popUpDiv}>
          <BackdropModal isOpen={showAddAvail} toggleShow={() => setShowAvail(!showAddAvail)}>
            <CreateBox>
              <Typography variant="h6" style={{ ...$headerStyle, textAlign: "center" }}>
                {" "}
                add a new availability for : {availability.title}
              </Typography>
              <DateRange
                startDate={trip.duration.start}
                endDate={trip.duration.end}
                updateDates={(startDate, endDate) => {
                  updateDuration(startDate, endDate)
                }}
              />
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={() =>
                  updateAvailabillity((success) => {
                    if (success) {
                      setShowAvail(false)
                    }
                  })
                }
              >
                add availability
              </Button>
            </CreateBox>
          </BackdropModal>
        </div>
        <p></p>
      </Paper>
    </>
  )
}
const $popUpDiv: React.CSSProperties = {
  position: "absolute",
  zIndex: 2,
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}
