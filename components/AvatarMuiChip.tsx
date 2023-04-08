import { Tooltip, Typography } from "@mui/material"
import Chip from "@mui/material/Chip"
import { User } from "../utility/types/user"
import Avatar from "./Avatar"

function AttendeeDisplay({ attendee }: { attendee: User }) {
  const tooltipText = (
    <div>
      {attendee.allergies ? (
        <div>
          <Typography>allergies</Typography>
          <p>{attendee.allergies}</p>
        </div>
      ) : (
        <></>
      )}
      {attendee.medicalInfo ? (
        <div>
          <Typography>preferences</Typography>
          <p>{attendee.medicalInfo}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
  return (
    <Tooltip title={tooltipText} placement={"right"}>
      <Chip
        variant="outlined"
        color="secondary"
        label={attendee.username}
        avatar={<Avatar name={attendee.name} size={25} />}
        sx={{ padding: 1, marginBottom: 1 }}
      />
    </Tooltip>
  )
}

export default function AvatarMuiChip({ attendees }: { attendees: Map<string, User> | undefined }) {
  return (
    <>
      {attendees ? (
        attendees.size !== 0 ? (
          Array.from(attendees.values()).map((attendee: User, index: number) => {
            return <AttendeeDisplay key={index} attendee={attendee} />
          })
        ) : (
          <div>current trip has no attendees</div>
        )
      ) : (
        <div>current trip has no attendees</div>
      )}
    </>
  )
}
