import { Grid, Stack } from "@mui/material"
import React from "react"
import { CalendarWidget } from "../components/Dashboard/Widgets/Calendar"
import { PreferencesWidget } from "../components/Dashboard/Widgets/Preferences"

export default function test() {
  return (
    <div style={$wrapper}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {/* <PreferencesWidget /> */}
        <CalendarWidget
          availability={{
            owner: "user",
            uid: "uid",
            title: "dummy avail",
            availabillities: new Map<string, Array<string>>([
              ["3:1", ["username", "test", "hi"]],
              ["3:3", ["username2", "test2", "hi2"]],
              ["3:9", ["username3", "test3", "hi3"]],
              ["4:20", ["username4", "test4", "hi4"]],
            ]),
          }}
        />
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
