import { Box, Button, Typography } from "@mui/material"
import React from "react"
import theme from "../../styles/theme/Theme"
import useCreateTrip from "../../utility/hooks/create/createTrip"
import { useTrip } from "../../utility/hooks/trip"
import { Duration } from "../../utility/types/trip"
import DateRange from "./DateRange"
import PlacesSearch from "./PlacesSearch"

export default function ModifyTrip() {
  function closeModal() {
    throw new Error("Function not implemented.")
  }

  const { trip } = useTrip()
  const {
    createTrip,
    updateAttendees,
    updateDuration,
    updateDestination,
    attendeeOptions,
    maybeCreateTrip,
    addAttendeeOption,
  } = useCreateTrip()

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        maxWidth: "750px",
        overflowY: "auto",
        width: "80vw",
        height: "100%",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box style={{ overflowY: "auto", maxHeight: "850px", width: "100%", gap: 2 }}>
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
          Modifying trip to {/*event.location*/ "location"}
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          destination
        </Typography>
        <PlacesSearch
          place={trip.destination}
          types={[]}
          setPlace={(_, place) => updateDestination(_, place)}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          duration
          {/* // Need to add widget for adding day // addNewWidget */}
        </Typography>
        <DateRange
          startDate={trip.duration.start}
          endDate={trip.duration.end}
          updateDates={(startDate, endDate) => updateDuration(startDate, endDate)}
        />
        <Button
          sx={{ width: "100%", marginTop: "10px" }}
          color={"primary"}
          variant="contained"
          //   onClick={() =>
          //     create((isSuccess: any) => {
          //       if (isSuccess) closeModal()
          //     })
          //   }
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}

function changeDayWidgets(oldDuration: Duration, start: Date, end: Date) {
  if (oldDuration.start == start && oldDuration.end == end) {
    return
  }
}
