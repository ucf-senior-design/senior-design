import { Grid, Stack } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { TeamForm } from "../../../components/Dashboard/Widgets/TeamComponents/TeamForm"

export default function Teams() {
  const router = useRouter()
  const [teamID, setTeamID] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const { id } = router.query

    setTeamID(id as string | undefined)
  }, [router])

  return (
    <div style={$wrapper}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <TeamForm purpose="view" />
        <Stack
          sx={{ display: { xs: "none", md: "block" } }}
          style={{
            height: "30%",
            width: "30%",
            display: "absolute",
            zIndex: 1,
          }}
        ></Stack>
      </Grid>
    </div>
  )
}

const $wrapper: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
