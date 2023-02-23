import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import {
  SuggestionOption,
  SuggestionWidget,
} from '../../../utility/types/trip';
import WidgetHeader from './WidgetHeader';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';
import useSuggestion from '../../../utility/hooks/suggestion';
import React from 'react';
import { BackdropModal } from '../../BackdropModal';
import { useTrip } from '../../../utility/hooks/trip';

export function SuggestionWidgets() {
  const { trip } = useTrip();

  const [suggestions, setSuggestions] = React.useState<React.ReactNode>(<></>);
  React.useEffect(() => {
    setSuggestions(getSuggestions);
  }, [trip.suggestions]);

  function getSuggestions() {
    const s: Array<React.ReactNode> = [];
    trip.suggestions?.forEach((suggestion) => {
      s.push(
        <Suggestions
          key={suggestion.uid}
          suggestionWidget={suggestion}
          tripID={trip.uid}
        />
      );
    });

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        {s}
      </div>
    );
  }

  return <> {suggestions}</>;
}

function Suggestions({
  suggestionWidget,
  tripID,
}: {
  tripID: string;
  suggestionWidget: SuggestionWidget;
}) {
  const {
    doesUserOwn,
    storeNewSuggestion,
    toggleAddPopUp,
    didUserLike,
    like,
    unLike,
    suggestion,
    deleteSuggestion,
    addSuggestion,
    toggleShowAllSuggestionsPopUp,
  } = useSuggestion(suggestionWidget);

  function Suggestion({ suggestion }: { suggestion: SuggestionOption }) {
    return (
      <Grid key={suggestion.uid} container>
        {/** TODO: Ensure Trip Hook has a way to store owner information and get the user's name from this. */}
        <Grid
          item
          xs={10}
          sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}
        >
          <Typography> {suggestion.option}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          {didUserLike(suggestion.uid) ? (
            <Favorite
              sx={{ color: 'pink' }}
              onClick={async () => await unLike(suggestion.uid)}
            />
          ) : (
            <FavoriteBorder
              sx={{ color: 'pink' }}
              onClick={async () => await like(suggestion.uid)}
            />
          )}
        </Grid>
      </Grid>
    );
  }

  function CreateSuggestions({ showAll }: { showAll: boolean }) {
    const a: Array<React.ReactNode> = [];
    suggestion.suggestions.forEach((suggestion, key) => {
      if (a.length < 5 || showAll) {
        a.push(<Suggestion key={key} suggestion={suggestion} />);
      }
    });
    return <>{a}</>;
  }

  return (
    <>
      <BackdropModal
        isOpen={suggestion.showAllSuggestionsPopUp}
        toggleShow={() => toggleShowAllSuggestionsPopUp()}
      >
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            width: '300px',
            gap: 10,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            All Suggestions
          </Typography>
          <CreateSuggestions showAll={true} />
        </div>
      </BackdropModal>
      <BackdropModal
        isOpen={suggestion.showAddPopUp}
        toggleShow={() => toggleAddPopUp()}
      >
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            width: '300px',
            gap: 10,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {`Add suggestions for ${suggestion.title}`}
          </Typography>
          <TextField
            color="secondary"
            label={'new suggestion'}
            onChange={(e) => {
              storeNewSuggestion(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => addSuggestion()}
          >
            add
          </Button>
        </div>
      </BackdropModal>
      <Paper sx={{ padding: '20px', width: '80vw', maxWidth: '300px' }}>
        <WidgetHeader
          owner={suggestion.owner}
          rightAccessory={
            <Button onClick={() => toggleAddPopUp()}>
              <Add />
            </Button>
          }
        />
        <Typography
          sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}
        >
          {suggestion.title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <>
            <CreateSuggestions showAll={false} />
          </>
        </Box>
        {suggestion.suggestions.size >= 5 && (
          <Button
            variant="text"
            onClick={() => toggleShowAllSuggestionsPopUp()}
          >
            view more
          </Button>
        )}
      </Paper>
    </>
  );
}
