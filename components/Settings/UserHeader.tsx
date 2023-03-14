import { Avatar, Grid, Stack, Typography } from "@mui/material"

export default function UserHeader() {
  return (
    <Grid
      container
      style={{
        padding: "20px",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Avatar alt="placeholder icon" sx={{ width: 120, height: 120, marginRight: 5 }}>
          J
        </Avatar>
        <Stack direction="column">
          <Typography sx={{ fontWeight: "300", fontSize: "25px" }}>jane doe</Typography>
          <Typography sx={{ fontSize: "13px" }}>emergency contact: (999) - 999 - 999</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
