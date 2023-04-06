import { Button, Divider, Paper, Stack, Typography } from "@mui/material"
import Link from "next/link"

export default function SecurityInfo() {
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
        <Typography sx={{ fontSize: "15px" }}>security information</Typography>
        <Divider />
        <Link href="/settings/passwordUpdate" passHref>
          <Button
            variant="outlined"
            aria-label="update password button"
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            update password
          </Button>
        </Link>
      </Stack>
    </Paper>
  )
}
