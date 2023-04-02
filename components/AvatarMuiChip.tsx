import { Tooltip } from "@mui/material"
import Chip from "@mui/material/Chip"
import Avatar from "./Avatar"

function AttendeeDisplay({ attendee }: { attendee: string }) {
  const tooltipText = "Line 1\nLine 2\nLine 3"
  return (
    <Tooltip title={tooltipText} placement={"right"} style={$wrapper}>
      <Chip
        variant="outlined"
        color="secondary"
        label={attendee}
        avatar={<Avatar name={attendee} size={25} />}
        sx={{ padding: 1, marginBottom: 1 }}
      />
    </Tooltip>
  )
}

export default function AvatarMuiChip({ attendees }: { attendees: Set<string> }) {
  return (
    <>
      {Array.from(attendees).map((attendee: string, index: number) => {
        return <AttendeeDisplay key={index} attendee={attendee} />
      })}
    </>
  )
}

const $wrapper: React.CSSProperties = {
  whiteSpace: "pre-line",
}
