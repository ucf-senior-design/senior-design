import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import useCreateTrip from "../../../utility/hooks/create/createTrip"
import PlacesSearch from "../../../components/Form/PlacesSearch"
import SelectAttendees from "../../../components/Form/SelectAttendees"
import UserSearch from "../../../components/Form/UserSearch"
import theme from "../../../styles/theme/Theme"
import SecurePage from "../../../components/SecurePage"
import DateRange from "../../../components/Form/DateRange"
import { MenuProps } from "antd"

export default function CreateTrip() {
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
    <SecurePage>
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
          <Box style={{ backgroundColor: "red", width: "100vw" }}>
            <div> hello </div>
            {createTrip.attendees.map((value) => {
              return <div key={value.uid}>{value.name}</div>
            })}
          </Box>
          <Divider>or</Divider>
          <Typography
            variant="body1"
            style={{ ...$headerStyle, textAlign: "center", color: undefined }}
          >
            add attendee by username
          </Typography>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              onChange={(e) => console.log(e.target.value)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {createTrip.attendees.map((value) => (
                    <Chip key={value.uid} label={value.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {createTrip.attendeeOptions.map((value) => (
                <MenuItem key={value.uid} value={value.uid}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            updateDates={updateDuration}
          />

          <Button color="primary" variant="contained" onClick={async () => await maybeCreateTrip()}>
            create
          </Button>
        </Paper>
      </div>
    </SecurePage>
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
