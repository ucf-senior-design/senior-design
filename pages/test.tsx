import { Divider, Stack, Typography } from "@mui/material"
import AvatarMuiChip from "../components/AvatarMuiChip"

const tendies = new Set(["neku.saku", "shikimis", "rindragon"])

export default function Test() {
  return (
    <Stack width={150} direction={"column"}>
      <Typography sx={{ padding: 1 }}>trip attendees</Typography>
      <Divider sx={{ marginBottom: 1 }} />
      <AvatarMuiChip attendees={tendies} />
    </Stack>
  )
}
