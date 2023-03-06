import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { SelectChipList } from "../../components/SelectChipList"
import theme from "../../styles/theme/Theme"
import { useAuth } from "../../utility/hooks/authentication"
import { SelectListHook } from "../../utility/hooks/selectList"
import { User } from "../../utility/types/user"

export default function Details() {
  const { addDetails, user } = useAuth()
  const [details, sDetails] = useState<User>({
    uid: "",
    email: "",
    name: "",
    profilePic: "",
    username: "",
    medicalInfo: [],
    allergies: [],
  })

  React.useEffect(() => {
    if (user === undefined || user === null) {
      return
    }
    sDetails((details) => ({
      ...details,
      uid: user.uid,
      email: user.email,
      profilePic: user.profilePic,
      name: user.name,
    }))
  }, [details.uid, user])

  const foodAllergies = SelectListHook({
    options: ["egg", "peanuts", "tree nuts", "milk", "vegan"],
  })
  const medicalCond = SelectListHook({
    options: [
      "avoid crowds",
      "avoid unstable terrain",
      "avoid extended activity",
      "avoid flashing",
      "avoid loud noises",
    ],
  })
  const isUsernameInvalid = details.username.length === 0
  const isNameInvalid = details.name.length === 0

  // TODO: Implement this uploading profile picture.

  async function maybeFinishRegister() {
    const user: User = {
      ...details,
      medicalInfo: Array.from(medicalCond.values.selected),
      allergies: Array.from(foodAllergies.values.selected),
    }
    await addDetails(user, (response) => {
      if (!response.isSuccess) {
        alert(response.errorMessage)
      }
    })
  }

  return (
    <div style={$wrapper}>
      <Paper
        elevation={3}
        style={{
          width: "90%",
          maxWidth: "600px",
          background: theme.palette.background.paper,
          padding: 20,
          paddingBottom: 40,
        }}
      >
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <div style={$container}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                fontWeight: 500,
                color: theme.palette.secondary.main,
                padding: 5,
              }}
            >
              details
            </Typography>
            <Typography
              style={{
                textAlign: "center",
                color: theme.palette.secondary.main,
                paddingBottom: 15,
              }}
            >
              please enter some additional details.
            </Typography>

            <TextField
              color="secondary"
              sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}
              error={isNameInvalid}
              placeholder={isNameInvalid ? "missing name" : undefined}
              value={details.name}
              label="name"
              onChange={(e) =>
                sDetails((details) => ({
                  ...details,
                  name: e.target.value,
                }))
              }
            />

            <TextField
              color="secondary"
              sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}
              error={isUsernameInvalid}
              placeholder={isUsernameInvalid ? "invalid username" : undefined}
              label="username"
              value={details.username}
              onChange={(e) =>
                sDetails((details) => ({
                  ...details,
                  username: e.target.value,
                }))
              }
            />

            <SelectChipList
              hook={foodAllergies}
              label="diet restrictions and allergies"
              propertyName="allergy"
            />
            <SelectChipList
              hook={medicalCond}
              label="health preferences"
              propertyName="medical condition"
            />

            <Button
              sx={{
                width: "100%",
                paddingTop: 2,
                paddingBottom: 2,
              }}
              color="primary"
              variant="contained"
              disabled={isNameInvalid || isUsernameInvalid}
              onClick={async () => {
                await maybeFinishRegister()
              }}
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Paper>
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

const $container: React.CSSProperties = {
  overflowY: "auto",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxHeight: "90%",
  paddingRight: 10,
  alignContent: "center",
  flexGrow: 1,
  flexDirection: "column",
}
