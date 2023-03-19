import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import theme from "../../styles/theme/Theme"
import DateRange from "./DateRange"

export default function ModifyEvent() {
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
          Modifying {/*event.title*/ "event"}
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          title
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          // value={event.title}
          // onChange={(e) => updateTitle(e.target.value)}
        />

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          description
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          // value={event.description}
          // onChange={(e) => updateDescription(e.target.value)}
        />
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
  event: any
  create: any
  updateTitle: any
  updateDuration: any
  updateAttendees: any
  updateDescription: any
  updateLocation: any
  addAttendeeOption: any
} {
  throw new Error("Function not implemented.")
}
