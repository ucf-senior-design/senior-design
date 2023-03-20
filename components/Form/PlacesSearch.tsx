import { LocationOn } from "@mui/icons-material"
import { Autocomplete, Box, Grid, SxProps, TextField, Theme, Typography } from "@mui/material"
import parse from "autosuggest-highlight/parse"
import React from "react"
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService"

export default function PlacesSearch({
  types,
  setPlace,
  place,
  sx,
}: {
  sx?: SxProps<Theme>
  place: string
  types: Array<string>
  setPlace: (placeID: string, place: string) => void
}) {
  const [inputValue, setInputValue] = React.useState("")
  const { placePredictions, getPlacePredictions } = useGoogle({
    apiKey: process.env.NEXT_PUBLIC_PLACES_KEY,
    options: {
      types: types,
    },
  })

  return (
    <Autocomplete
      value={{
        description: place,
      }}
      inputValue={inputValue}
      onChange={(_, value) => {
        if (value === null) {
          return
        }
        setPlace(value.place_id, value.description)
        setInputValue(value.description)
      }}
      disablePortal
      placeholder="destination"
      options={placePredictions}
      getOptionLabel={(option) => option.description}
      onInput={(e) => {
        // @ts-ignore
        let place = e.target.value === null ? "" : e.target.value

        setInputValue(place)
        getPlacePredictions({
          input: place,
        })
      }}
      sx={sx}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOn sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map((part: any, index: any) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
      renderInput={(params) => {
        return <TextField color="secondary" {...params} label="destination" />
      }}
    />
  )
}
