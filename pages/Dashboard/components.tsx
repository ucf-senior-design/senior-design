import { WbCloudy } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react';
import Suggestions from '../../components/Dashboard/Widgets/Suggestions';
import useSuggestion from '../../utility/hooks/suggestion';

import {
  Event as EventType,
  Poll as PollType,
  SuggestionOption,
} from '../../utility/types/trip';
/**
 * Delete Later: Just to prevent merge conflicts and display components
 */

export default function Dashboard() {
  const sEvent: EventType = {
    uid: 'uid',
    title: 'title',
    attendees: ['jane doe', 'john doe', 'amy', 'bob'],
    duration: {
      start: new Date(),
      end: new Date(),
    },
    location: 'location',
    description: 'the description goes here',
  };

  const sPoll: PollType = {
    uid: 'uid',
    owner: 'owner',
    title: 'title',
    options: [
      {
        value: 'option1',
        voters: ['person1', 'person2'],
      },
      {
        value: 'option2',
        voters: ['person3'],
      },
      {
        value: 'option2',
        voters: ['person4'],
      },
    ],
  };

  // Remove after we have the trip hook built this is just for testing
  const [tripID, setTripID] = React.useState('hello');
  const fetchResponse = {
    widget: {
      uid: 'uZX8pFcQg1gccgYWdZO3',
      owner: 'test',
      title: 'Test Widget Postman',
    },
    suggestions: [
      {
        uid: 'sitsmCfW40S8EKXs0r7I',
        owner: 'user',
        likes: ['user'],
        option: 'goodbye',
      },
      {
        uid: 'psAqq8DGzhTccsBkehgR',
        owner: 'user',
        likes: ['user'],
        option: 'hello',
      },
    ],
  };

  const suggestions = new Map<string, SuggestionOption>();
  fetchResponse.suggestions.forEach((suggestion) => {
    suggestions.set(suggestion.uid, {
      likes: new Set<string>(suggestion.likes),
      uid: suggestion.uid,
      owner: suggestion.owner,
      option: suggestion.option,
    });
  });

  const suggestion = useSuggestion(
    {
      suggestions: suggestions,
      ...fetchResponse.widget,
    },
    tripID
  );

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
      <Suggestions useSuggestion={suggestion} />
    </Grid>
  );
}
