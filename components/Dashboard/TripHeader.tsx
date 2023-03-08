import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import EditIcon from "@mui/icons-material/Edit"
import { Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import Avatar from "../../components/Avatar"

export const TripHeader = (props: any) => {
  const item1 = { username: "username", id: "123", name: "noriyuki" }
  const item2 = { username: "username2", id: "456", name: "minoru" }
  const trip_details = {
    location: "Orlando",
    date_start: "October 1",
    date_end: "October 3",
    participants: [item1, item2],
  }

  return (
    <div>
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
            {trip_details.location} <EditIcon sx={{ color: "white" }} />
          </Typography>

          <Typography sx={{ color: "white", fontWeight: "400", fontSize: "20px" }}>
            {trip_details.date_start} - {trip_details.date_end}
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {trip_details.participants.map((item) => (
              <Avatar key={item.id} name={item.username} />
            ))}
          </Grid>
        </Grid>
        {/* <img src="/header.svg" alt="header" layout={"fill"} objectFit={"cover"} /> */}
      </Grid>
    </div>
  )
}
