import { Autocomplete, SxProps, TextField, Theme } from "@mui/material"
import { AttendeeOption } from "../../utility/hooks/create/createTrip"

export default function SelectAttendees({
  selectedAttendees,
  options,
  updateAttendees,
  sx,
}: {
  sx?: SxProps<Theme>
  selectedAttendees: Array<AttendeeOption>
  options: Array<AttendeeOption>
  updateAttendees: (attendees: Array<AttendeeOption>) => void
}) {
  return (
    <Autocomplete
      value={selectedAttendees}
      multiple
      id="multiple-limit-tags"
      isOptionEqualToValue={(option, value) => {
        return option.uid === value.uid
      }}
      options={options}
      onChange={(e, value) => updateAttendees(value)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} color="secondary" label="attendees" placeholder="attendees" />
      )}
      sx={sx}
    />
  )
}
