import { Box, Button, Divider, Typography } from "@mui/material"
import theme from "../../styles/theme/Theme"
import DateRange from "./DateRange"

export default function ModifyTrip() {
  function closeModal() {
    throw new Error("Function not implemented.")
  }

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
        {/* <PlacesSearch
          place={event.location}
          types={[]}
          setPlace={(_, place) => updateLocation(place)}
        /> */}
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          attendees
        </Typography>
        {/* <SelectAttendees
          selectedAttendees={event.attendees}
          options={event.attendeeOptions}
          updateAttendees={(a) => updateAttendees(a)}
        /> */}
        <Divider>or</Divider>
        <Typography
          variant="body1"
          style={{ ...$headerStyle, textAlign: "center", color: undefined }}
        >
          add attendee by username
        </Typography>

        {/* <UserSearch
          sx={{ width: "100%", marginBottom: "10px" }}
          handleFoundUser={(user) => addAttendeeOption("person", user.uid, user.name)}
        /> */}

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          duration
        </Typography>
        <DateRange
          startDate={new Date()}
          endDate={new Date()}
          // startDate={event.duration.start}
          // endDate={event.duration.end}
          // updateDates={(startDate, endDate) => updateDuration(startDate, endDate)}
          updateDates={() => {}}
        />
        <Button
          sx={{ width: "100%", marginTop: "10px" }}
          color={"primary"}
          variant="contained"
          // onClick={() =>
          //   create((isSuccess: any) => {
          //     if (isSuccess) closeModal()
          //   })
          // }
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
function useCreateEvent(): {
  trip: any
  create: any
  updateDuration: any
  updateAttendees: any
  updateLocation: any
  addAttendeeOption: any
} {
  throw new Error("Function not implemented.")
}
