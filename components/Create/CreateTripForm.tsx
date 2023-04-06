import { Paper } from "@mui/material"
import { Typography, Divider, Button } from "@mui/material"
import DateRange from "../Form/DateRange"
import useCreateTrip from "../../utility/hooks/create/createTrip"
import PlacesSearch from "../Form/PlacesSearch"
import SelectAttendees from "../Form/SelectAttendees"
import UserSearch from "../Form/UserSearch"
import theme from "../../styles/theme/Theme"

export default function CreateTripForm() {
  const {
    createTrip,
    updateAttendees,
    updateDuration,
    updateDestination,
    maybeCreateTrip,
    addAttendeeOption,
  } = useCreateTrip()

  return (
    <div style={$containerStyle}>
      <Paper sx={$paperStyle}>
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
          create trip
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          destination
        </Typography>
        <PlacesSearch
          place={createTrip.destination}
          types={["(cities)"]}
          setPlace={(placeID, place) => updateDestination(placeID, place)}
        />

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          attendees
        </Typography>
        <SelectAttendees
          selectedAttendees={createTrip.attendees}
          options={createTrip.attendeeOptions}
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
          startDate={createTrip.duration.start}
          endDate={createTrip.duration.end}
          updateDates={(startDate, endDate) => updateDuration(startDate, endDate)}
        />
        <Button color="primary" variant="contained" onClick={async () => await maybeCreateTrip()}>
          create
        </Button>
      </Paper>
    </div>
  )
}

const $containerStyle: React.CSSProperties = {
  display: "flex",
  padding: "20px",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}

const $paperStyle: React.CSSProperties = {
  borderRadius: "10px",
  padding: "20px",
  display: "flex",
  maxWidth: "600px",
  width: "100%",
  alignContent: "center",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}
