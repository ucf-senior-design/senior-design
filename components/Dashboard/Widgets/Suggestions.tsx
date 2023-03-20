import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { SuggestionOption, SuggestionWidget } from "../../../utility/types/trip"
import WidgetHeader from "./WidgetHeader"
import { Add, Favorite, FavoriteBorder } from "@mui/icons-material"
import useSuggestion from "../../../utility/hooks/suggestion"
import React from "react"
import { BackdropModal } from "../../BackdropModal"
import { useTrip } from "../../../utility/hooks/trip"

export function Suggestions({
  suggestionWidget,
  tripID,
}: {
  tripID: string
  suggestionWidget: SuggestionWidget
}) {
  const {
    storeNewSuggestion,
    toggleAddPopUp,
    didUserLike,
    like,
    unLike,
    suggestion,
    addSuggestion,
    toggleShowAllSuggestionsPopUp,
  } = useSuggestion(suggestionWidget)

  function Suggestion({ suggestion }: { suggestion: SuggestionOption }) {
    return (
      <Grid key={suggestion.uid} container>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
          <Typography> {suggestion.option}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {didUserLike(suggestion.uid) ? (
            <Button
              onClick={async (e) => {
                console.log("unlike")
                e.stopPropagation()
                await unLike(suggestion.uid)
              }}
            >
              <Favorite sx={{ color: "pink" }} />
            </Button>
          ) : (
            <Button
              onClick={async (e) => {
                e.stopPropagation()
                await like(suggestion.uid)
              }}
            >
              <FavoriteBorder sx={{ color: "pink" }} />
            </Button>
          )}
        </Grid>
      </Grid>
    )
  }

  function CreateSuggestions({ showAll }: { showAll: boolean }) {
    const a: Array<React.ReactNode> = []
    suggestion.suggestions.forEach((suggestion, key) => {
      if (a.length < 5 || showAll) {
        a.push(<Suggestion key={key} suggestion={suggestion} />)
      }
    })
    return <>{a}</>
  }

  return (
    <>
      <div style={{ position: "absolute", zIndex: 2 }}>
        <BackdropModal
          isOpen={suggestion.showAllSuggestionsPopUp}
          toggleShow={() => toggleShowAllSuggestionsPopUp()}
        >
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              padding: 20,
              width: "300px",
              gap: 10,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              All Suggestions
            </Typography>
            <CreateSuggestions showAll={true} />
          </div>
        </BackdropModal>
      </div>
      <div style={{ position: "absolute", zIndex: 2 }}>
        <BackdropModal isOpen={suggestion.showAddPopUp} toggleShow={() => toggleAddPopUp()}>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              padding: 20,
              width: "300px",
              gap: 10,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {`Add suggestions for ${suggestion.title}`}
            </Typography>
            <TextField
              color="secondary"
              label={"new suggestion"}
              onChange={(e) => {
                storeNewSuggestion(e.target.value)
              }}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation()
                addSuggestion()
              }}
            >
              add
            </Button>
          </div>
        </BackdropModal>
      </div>
      <Paper
        sx={{ padding: "20px", width: "100%", height: "100%" }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <WidgetHeader
          owner={suggestion.owner}
          rightAccessory={
            <Button onClick={() => toggleAddPopUp()}>
              <Add />
            </Button>
          }
        />
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          {suggestion.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <>
            <CreateSuggestions showAll={false} />
          </>
        </Box>
        {suggestion.suggestions.size >= 5 && (
          <Button variant="text" onClick={() => toggleShowAllSuggestionsPopUp()}>
            view more
          </Button>
        )}
      </Paper>
    </>
  )
}
