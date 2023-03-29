import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import EditIcon from "@mui/icons-material/Edit"
import { Button, Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import Avatar from "../../components/Avatar"
import { useTrip } from "../../utility/hooks/trip"
import React from "react"
import { useScreen } from "../../utility/hooks/screen"
import { useRouter } from "next/router"
import { ArrowBack } from "@mui/icons-material"


export function TripHeader() {
  const router = useRouter()
  const { trip } = useTrip()
  const { updateNav } = useScreen()
  React.useEffect(() => {
    updateNav(
      {
        background:
          "linear-gradient(99.17deg, rgba(162, 54, 3, 0.9) -3.2%, rgba(101, 46, 129, 0.9) 26.95%, rgba(75, 98, 147, 0.9) 60.14%, rgba(63, 61, 86, 0.9) 97.04%)",
      },
      "transparent",
      <div
        style={{
          height: "250px",
        }}
      >
        <Button onClick={() => router.back()}>
          <ArrowBack sx={{ color: "white" }} />
        </Button>
        <div style={{ padding: 20 }}>
          <Typography sx={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>
            {trip.destination}
          </Typography>
          {Array.from(trip.attendees).map((attendee) => {
            return <Avatar key={attendee} name={trip.userData?.get(attendee)?.name ?? "name"} />
          })}
        </div>
      </div>,
    )
  }, [trip])

  return <></>
}
