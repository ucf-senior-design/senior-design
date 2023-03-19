import { useDashboard } from "../../utility/hooks/dashboard"
import React from "react"
import TripCard from "./TripCard"
import { Autocomplete, Button, Paper, TextField } from "@mui/material"
import { Trip } from "../../utility/types/trip"
import { Add } from "@mui/icons-material"

type TripSearchOption = {
  destination: string
  start: string
  id: string
}
export default function ViewTrips() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const [tripSearchOptions, setTripSearchOptions] = React.useState<Array<TripSearchOption>>([])
  const { trips } = useDashboard()

  console.log(trips)
  React.useEffect(() => {
    let options: Array<TripSearchOption> = []

    if (trips !== undefined) {
      trips.forEach((trip) => {
        options.push({
          id: trip.uid,
          start: `${
            monthNames[trip.duration.start.getMonth()]
          } ${trip.duration.start.getFullYear()}`,
          destination: trip.destination,
        })
      })
    }
    options = options.sort((a, b) => -b.destination.localeCompare(a.destination))
    setTripSearchOptions(options)
  }, [trips])
  function CreateTripCards() {
    let tripCards: Array<React.ReactNode> = []
    if (trips !== undefined) {
      trips.forEach((trip) => {
        tripCards.push(
          <TripCard
            key={trip.uid}
            uid={trip.uid}
            destination={trip.destination}
            imageURI={trip.photoURL}
          />,
        )
      })
    }

    return (
      <Paper
        sx={{
          backgroundColor: "transparent",

          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100vw",
        }}
      >
        {tripCards}
      </Paper>
    )
  }
  return (
    <>
      <Paper
        sx={{
          background: "transparent",
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: { xs: "center", md: "end" },
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <Autocomplete
          options={tripSearchOptions}
          groupBy={(option) => option.start}
          getOptionLabel={(option) => option.destination}
          sx={{ width: { xs: "100%", md: 300 }, margin: "10px" }}
          renderInput={(params) => <TextField {...params} label="find trip" color="secondary" />}
        />
      </Paper>
      <CreateTripCards />
    </>
  )
}
