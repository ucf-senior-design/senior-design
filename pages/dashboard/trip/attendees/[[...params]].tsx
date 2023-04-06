import { ArrowBack } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import AvatarMuiChip from "../../../../components/AvatarMuiChip"
import { useScreen } from "../../../../utility/hooks/screen"
import { useTrip } from "../../../../utility/hooks/trip"
import { User } from "../../../../utility/types/user"

export default function Attendees() {
  const router = useRouter()
  const { trip } = useTrip()
  const { updateNav } = useScreen()
  const [attendees, setAttendees] = React.useState<Map<string, User> | undefined>()

  React.useEffect(() => {
    setAttendees(trip?.userData ?? new Map())

    updateNav(
      {
        background:
          "linear-gradient(99.17deg, rgba(162, 54, 3, 0.9) -3.2%, rgba(101, 46, 129, 0.9) 26.95%, rgba(75, 98, 147, 0.9) 60.14%, rgba(63, 61, 86, 0.9) 97.04%)",
      },
      "transparent",
      <div
        style={{
          height: "150px",
        }}
      >
        <Button onClick={() => router.back()}>
          <ArrowBack sx={{ color: "white" }} />
        </Button>
        <div
          style={{
            padding: 20,
            flexDirection: "column",
            display: "flex",

            alignContent: "center",
            justifyContent: "center",
            bottom: 0,
          }}
        >
          <Typography sx={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>
            trip attendees
          </Typography>
        </div>
      </div>,
    )
  }, [trip])

  return (
    <>
      <Stack width={150} direction={"column"}>
        <AvatarMuiChip attendees={attendees} />
      </Stack>
    </>
  )
}
