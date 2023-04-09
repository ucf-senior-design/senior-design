import { ArrowBack, People } from "@mui/icons-material"
import { Backdrop, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material"
import React from "react"
import Avatar from "../../../../components/Avatar"
import Header from "../../../../components/Header"
import { API_URL } from "../../../../utility/constants"
import { createFetchRequestOptions } from "../../../../utility/fetch"
import { useScreen } from "../../../../utility/hooks/screen"
import { User } from "../../../../utility/types/user"

export default function Attendees() {
  const [id, setId] = React.useState<string>()
  const [attendees, setAttendees] = React.useState<Array<User>>()

  const { updateAutoPadding } = useScreen()

  React.useEffect(() => {
    updateAutoPadding(false)
    if (window !== undefined && window.location !== undefined) {
      let location = window.location.search
      setId(location.replace("?id=", ""))
    }
  }, [])

  async function getUserData(attendees: Array<string>) {
    let userData = attendees.map(async (uid) => {
      const options = createFetchRequestOptions(null, "GET")
      const response = await fetch(`${API_URL}auth/user/getUserByID/${uid}`, options)
      if (response.ok) {
        return await response.json()
      } else {
        return await response.text()
      }
    })

    let responses = await Promise.all(userData)
    let a: Array<User> = []

    let map = new Map(
      responses.map((value) => {
        a.push(value)
        return [value.uid, value]
      }),
    )

    return a
  }

  async function getAttendeeData() {
    const options = createFetchRequestOptions(null, "GET")
    const response = await fetch(`${API_URL}trip/${id}`, options)
    if (response.ok) {
      let t = await response.json()
      setAttendees(await getUserData(t.attendees))
    }
  }

  React.useEffect(() => {
    if (id !== undefined) {
      getAttendeeData()
    }
  }, [id])

  return (
    <>
      {attendees === undefined && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Header
        icon={<People sx={{ color: "white", fontWeight: "700", fontSize: "40px" }} />}
        title="attendees"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: { xs: "10px", md: "50px" },
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <>
          {attendees !== undefined &&
            attendees.map((attendee) => {
              return (
                <Paper
                  key={attendee.uid}
                  sx={{ padding: "10px", width: { xs: "100%", md: "30%" } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      flexDirection: "row",
                      gap: "20px",
                      padding: "10px",
                    }}
                  >
                    <Avatar name={attendee.name} size={50} />
                    <Typography sx={{ fontWeight: "black", fontSize: "30px" }}>
                      {attendee.name}
                    </Typography>
                  </Box>
                  <Box sx={{ gap: "10px", padding: "10px" }}>
                    <Box sx={{ marginTop: "10px" }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        allergies
                      </Typography>
                      {attendee.medicalInfo.length > 0
                        ? attendee.medicalInfo.join(", ")
                        : "no known allergies"}
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        Restrictions{" "}
                      </Typography>{" "}
                      {attendee.medicalInfo.length > 0
                        ? attendee.medicalInfo.join(", ")
                        : "no restrictions"}
                    </Box>
                  </Box>
                </Paper>
              )
            })}
        </>
      </Box>
    </>
  )
}
