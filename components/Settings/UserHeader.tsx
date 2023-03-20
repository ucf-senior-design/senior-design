import { Grid, Stack, Typography } from "@mui/material"
import React from "react"
import Avatar from "../../components/Avatar"
import { User as UserType } from "../../utility/types/user"

export default function UserHeader({
  user,
}: {
  user: (UserType & { didFinishRegister: boolean }) | undefined
}) {

  const [displayName, setDisplayName] = React.useState("")

  React.useEffect(() => {
    setDisplayName(user?.name ?? "")
  }, [])

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
        <Avatar name={displayName} size={120} />
        <Stack direction="column">
          <Typography noWrap sx={{ fontWeight: "300", fontSize: "25px" }}>
            {displayName} ({user?.username ?? ""})
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
