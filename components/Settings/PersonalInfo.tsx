import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material"
import { MuiChipsInput } from "mui-chips-input"
import React from "react"
import { useAuth } from "../../utility/hooks/authentication"
import { useScreen } from "../../utility/hooks/screen"
import updateUser from "../../utility/hooks/settings"
import { User as UserType } from "../../utility/types/user"

export default function PersonalInfo() {
  const { user } = useAuth()
  const { loading, updateLoading, updateErrorToast, updateSuccessToast } = useScreen()

  console.log(user)
  const [info, setInfo] = React.useState<{
    medicalInfo: Array<string>
    allergies: Array<string>
    name: string
  }>({
    medicalInfo: user?.medicalInfo ?? [],
    allergies: user?.allergies ?? [],
    name: user?.name ?? "",
  })

  async function handleUpdate() {
    updateLoading(true)
    await updateUser(info, (response) => {
      if (response.isSuccess) {
        updateSuccessToast("information successfully updated!")
      } else {
        updateErrorToast("error updating. try again later")
      }
    })
    updateLoading(false)
  }

  return (
    <Paper>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        padding={3}
        sx={{
          maxWidth: "400px",
          width: "80vw",
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>personal information</Typography>
        <Divider />
        <TextField
          id="nameInput"
          value={info.name}
          label="display name"
          placeholder="ex. jane doe"
          onChange={(e: { target: { value: string } }) =>
            setInfo((info) => ({
              ...info,
              displayName: e.target.value,
            }))
          }
          sx={{ marginBottom: 2, marginTop: 1 }}
        />
        <Typography>allergies</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <MuiChipsInput
          value={info.allergies}
          onChange={(value) =>
            setInfo((info) => ({
              ...info,
              allergies: value,
            }))
          }
        >
          {info.allergies}
        </MuiChipsInput>
        <Typography sx={{ marginTop: 2 }}>medical information</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <MuiChipsInput
          value={info.medicalInfo}
          onChange={(value) =>
            setInfo((info) => ({
              ...info,
              medicalInfo: value,
            }))
          }
        >
          {info.medicalInfo}
        </MuiChipsInput>
        <Button
          disabled={loading}
          variant="contained"
          aria-label="update changes"
          sx={{ marginBottom: 2, marginTop: 2 }}
          onClick={async () => await handleUpdate()}
        >
          update changes
        </Button>
      </Stack>
    </Paper>
  )
}
