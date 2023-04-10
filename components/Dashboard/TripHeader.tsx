import { ArrowBack, Edit, MoreHoriz } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/router"
import React from "react"
import Avatar from "../../components/Avatar"
import { useScreen } from "../../utility/hooks/screen"
import { useTrip } from "../../utility/hooks/trip"
import { BackdropModal } from "../BackdropModal"
import ModifyTrip from "../Modify/ModifyTrip"

export function TripHeader({ showModify }: { showModify: () => void }) {
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
          <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
            <Typography sx={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>
              {trip.destination}
            </Typography>
            <Button variant="text" onClick={() => showModify()}>
              <Edit sx={{ color: "white", fontSize: "20px" }} />
            </Button>
          </Box>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {Array.from(trip.attendees).map((attendee, index) => {
              if (index <= 4)
                return (
                  <Avatar
                    key={attendee}
                    name={trip.userData?.get(attendee)?.name ?? "name"}
                    size={50}
                  />
                )
            })}
            {trip.attendees !== undefined && trip.attendees.size !== 0 && (
              <Button
                sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}
                variant="text"
                color="secondary"
                onClick={() => {
                  router.push(`/dashboard/trip/attendees?id=${trip.uid}`)
                }}
              >
                <MoreHoriz />
              </Button>
            )}
          </div>
        </div>
      </div>,
    )
  }, [trip])

  return <></>
}
const $popUpDiv: React.CSSProperties = {
  position: "absolute",
  zIndex: 5,
}
