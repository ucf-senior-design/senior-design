import { Box, Button, TextField, Typography } from "@mui/material"
import DateTimePicker from "react-datetime-picker"
import theme from "../../styles/theme/Theme"
import useCreateEvent from "../../utility/hooks/create/createEvent"
import PlacesSearch from "../Form/PlacesSearch"
import SelectAttendees from "../Form/SelectAttendees"

export default function CreateEvent() {
  const {
    event,
    create,
    updateTitle,
    updateStart,
    updateEnd,
    updateAttendees,
    updateDescription,
    updateLocation,
  } = useCreateEvent()

  return (
    <Box>
      <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
        create event
      </Typography>
      <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
        title
      </Typography>
      <TextField value={event.title} onChange={(e) => updateTitle(e.target.value)} />

      <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
        description
      </Typography>
      <TextField value={event.description} onChange={(e) => updateDescription(e.target.value)} />
      <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
        destination
      </Typography>
      <PlacesSearch
        place={event.location}
        types={["(cities)"]}
        setPlace={(_, place) => updateLocation(place)}
      />
      <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
        attendees
      </Typography>
      <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
        duration
      </Typography>
      <DateTimePicker value={event.duration.start} onChange={(newValue) => updateStart(newValue)} />
      <DateTimePicker value={event.duration.end} onChange={(newValue) => updateEnd(newValue)} />
      <Button onClick={() => create()} />
    </Box>
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
