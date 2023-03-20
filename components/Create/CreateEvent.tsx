import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import dayjs from "dayjs"
import theme from "../../styles/theme/Theme"
import useCreateEvent from "../../utility/hooks/create/createEvent"
import { useTrip } from "../../utility/hooks/trip"
import DateRange from "../Form/DateRange"
import PlacesSearch from "../Form/PlacesSearch"
import SelectAttendees from "../Form/SelectAttendees"
import UserSearch from "../Form/UserSearch"

export default function CreateEvent({ closeModal }: { closeModal: () => void }) {
  const {
    event,
    create,
    updateTitle,
    updateDuration,
    updateAttendees,
    updateDescription,
    updateLocation,
    addAttendeeOption,
  } = useCreateEvent()
  const { trip } = useTrip()

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
          create event
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          title
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={event.title}
          onChange={(e) => updateTitle(e.target.value)}
        />

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          description
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={event.description}
          onChange={(e) => updateDescription(e.target.value)}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          destination
        </Typography>
        <PlacesSearch
          place={event.location}
          types={[]}
          setPlace={(_, place) => updateLocation(place)}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          attendees
        </Typography>
        <SelectAttendees
          selectedAttendees={event.attendees}
          options={event.attendeeOptions}
          updateAttendees={(a) => updateAttendees(a)}
        />
        <Divider>or</Divider>
        <Typography
          variant="body1"
          style={{ ...$headerStyle, textAlign: "center", color: undefined }}
        >
          add attendee by username
        </Typography>

        <UserSearch
          sx={{ width: "100%", marginBottom: "10px" }}
          handleFoundUser={(user) => addAttendeeOption("person", user.uid, user.name)}
        />

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          duration
        </Typography>
        <DateRange
          disabledDate={(date) => {
            return (
              dayjs(trip.duration.start).isAfter(date) || dayjs(trip.duration.end).isBefore(date)
            )
          }}
          showTime
          startDate={event.duration.start}
          endDate={event.duration.end}
          updateDates={(startDate, endDate) => updateDuration(startDate, endDate)}
        />
        <Button
          sx={{ width: "100%", marginTop: "10px" }}
          color={"primary"}
          variant="contained"
          onClick={() =>
            create((isSuccess) => {
              if (isSuccess) closeModal()
            })
          }
        >
          {" "}
          create
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
