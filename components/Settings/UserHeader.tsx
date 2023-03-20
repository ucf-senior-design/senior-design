import { Grid, Stack, Typography } from "@mui/material"
import React from "react"
import Avatar from "../../components/Avatar"
import { useAuth } from "../../utility/hooks/authentication"

export default function UserHeader() {
  const { user } = useAuth()

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
        <Avatar name={user?.name ?? ""} size={120} />
        <Stack direction="column">
          <Typography noWrap sx={{ fontWeight: "300", fontSize: "25px" }}>
            {user?.name ?? ""} ({user?.username ?? ""})
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
