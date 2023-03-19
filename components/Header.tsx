import { Luggage, LuggageRounded } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import TripCard from "./Dashboard/TripCard"

export default function Header({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <>
      <Grid
        container
        style={{
          backgroundColor: "#4A485F",
          padding: "20px",
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          {icon}
          <Typography sx={{ color: "white", fontWeight: "700", fontSize: "40px" }}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
