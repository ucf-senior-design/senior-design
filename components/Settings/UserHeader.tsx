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
        alignContent: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <Avatar
        name={user?.name ?? ""}
        image={user?.profilePic.length !== 0 ? user?.profilePic : undefined}
        size={60}
      />
      <Stack direction="column">
        <Typography noWrap sx={{ fontWeight: "500", fontSize: "25px" }}>
          {user?.name ?? ""} ({user?.username ?? ""})
        </Typography>
      </Stack>
    </Grid>
  )
}
