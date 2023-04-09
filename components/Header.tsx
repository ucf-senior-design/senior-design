import { Luggage, LuggageRounded, ArrowBack } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import TripCard from "./Dashboard/TripCard"

export default function Header({ icon, title }: { icon: React.ReactNode; title: string }) {
  const router = useRouter()

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#4A485F",
          padding: "20px",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => router.back()}
          sx={{ display: "flex", alignItems: "start", justifyContent: "start" }}
        >
          <ArrowBack sx={{ color: "white" }} />
        </Button>
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
      </Box>
    </>
  )
}
