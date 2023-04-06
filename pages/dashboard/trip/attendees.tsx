import { Divider, Stack, Typography } from "@mui/material"
import React from "react"
import AvatarMuiChip from "../../../components/AvatarMuiChip"
import { TripProvider, useTrip } from "../../../utility/hooks/trip"
import { User } from "../../../utility/types/user"

const tendies = new Set(["neku.saku", "shikimis", "rindragon"])

export default function Attendees() {
  const { trip } = useTrip()
  const [attendees, setAttendees] = React.useState<Map<string, User> | undefined>()

  React.useEffect(() => {
    setAttendees(trip.userData)
  })

  return (
    <TripProvider>
      <Stack width={150} direction={"column"}>
        <Typography sx={{ padding: 1 }}>trip attendees</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <AvatarMuiChip attendees={attendees} />
      </Stack>
    </TripProvider>
  )
}
