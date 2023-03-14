import { Paper, Stack, TextField } from "@mui/material"

export default function SecurityInfo() {
  function doNothing() {
    console.log("update")
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
        <TextField
          id="nameInput"
          value=""
          label="display name"
          placeholder="jane doe"
          onChange={() => {
            doNothing()
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="contactInput"
          value=""
          label="emergency contact"
          placeholder="xxx - xxx - xxssx"
          onChange={() => {
            doNothing()
          }}
        />
      </Stack>
    </Paper>
  )
}
