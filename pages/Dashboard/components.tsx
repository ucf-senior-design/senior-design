import { Grid } from '@mui/material';
import React from 'react';
import Suggestions from '../../components/Dashboard/Widgets/Suggestions';
import { useAuth } from '../../utility/hooks/authentication';
import useTrip from '../../utility/hooks/trip';

export default function Dashboard() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = React.useState<React.ReactNode>(<></>);

  // TODO: This is just temp. Typically we'd retrive the trip on mount within the initilizeTrip function
  const { trip, initilizeTrip } = useTrip({
    uid: 'sample',
    attendees: [],
    duration: {
      start: new Date(),
      end: new Date(),
    },
    destination: 'Ohio',
  });

  // Initilize the trip on mount.
  React.useEffect(() => {
    initilizeTrip();
  }, []);

  // TODO: Whenever the a suggestion is added or deleted we will refresh all suggestion widgets.
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
          userID={user?.uid ?? ''}
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

  return (
    <Grid
      container
      sx={{
        padding: 2,
        backgroundColor: '#EFEFEF',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {suggestions}
    </Grid>
  );
}
