import { Add } from "@mui/icons-material"
import { Grid, Paper, Typography } from "@mui/material"
import { getTime } from "../../utility/helper"
import { Event } from "../../utility/types/trip"

export default function JoinableEvent({ event }: { event: Event }) {
  return (
    <Paper
      onClick={() => {
        // TODO: Handle Clicking on Join Event
      }}
      sx={{
        padding: "20px",
        backgroundColor: "rgba(84, 89, 118, 0.08)",
        width: "300px",
      }}
    >
      <Grid container sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "ceter",
            justifyContent: "center",
          }}
        >
          <Add sx={{ fontSize: "30px" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {event.title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              fontWeight: "medium",
              textTransform: "uppercase",
              fontSize: "14px",
            }}
          >
            {getTime(event.duration.start)}
          </Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              textTransform: "uppercase",
              fontSize: "14px",
            }}
          >
            {getTime(event.duration.end)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
