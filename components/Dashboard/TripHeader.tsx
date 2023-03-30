import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import EditIcon from "@mui/icons-material/Edit"
import { Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useTrip } from "../../utility/hooks/trip"

export default function TripHeader() {
  const { trip } = useTrip()

  return (
    <Grid
      container
      style={{
        padding: "20px",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "start",
          gap: 1,
          paddingTop: "50px",
        }}
      >
        <ArrowBackIcon sx={{ color: "white", fontSize: 40 }} />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "left",
          justifyContent: "start",
          paddingLeft: "50px",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "700", fontSize: "40px" }}>
          {trip.destination} <EditIcon sx={{ color: "white" }} />
        </Typography>

        <Typography sx={{ color: "white", fontWeight: "400", fontSize: "20px" }}>
          {/* not sure how to convert this to string since it doesnt accept it in normal state */}
          {/* {{trip.duration.start}.toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
            })} */}
          trip
        </Typography>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {/* used your code but not sure whats wrong here (?) committed w comment since it prevented push*/}

          {/* {{trip.attendees.map((attendee) => 
          (<Avatar key={attendee} name={trip.userData.get(attendee).name}))}} */}
        </Grid>
      </Grid>
    </Grid>
  )
}
