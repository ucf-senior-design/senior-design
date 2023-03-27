import { Grid, Typography } from "@mui/material"
import { useAuth } from "../../../utility/hooks/authentication"
import { useTrip } from "../../../utility/hooks/trip"
import Avatar from "../../Avatar"

export default function WidgetHeader({
  owner,
  rightAccessory,
}: {
  owner: string
  rightAccessory?: React.ReactNode
}) {
  const { trip } = useTrip()
  function getOwnerString() {
    return trip.userData?.get(owner)?.name ?? ""
  }

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 1,
        width: "100%",
      }}
    >
      <Grid
        item
        xs={8}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {/** TODO: Get actual owners name */}
        <Avatar name={"owner"} size={30} />
        <Typography sx={{ fontWeight: 600 }}>by {getOwnerString()} </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {rightAccessory}
      </Grid>
    </Grid>
  )
}
