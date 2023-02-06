import { WbCloudy } from '@mui/icons-material';
import { Grid } from '@mui/material';
import Day from '../../components/Dashboard/Day';
import Masonry from '@mui/lab/Masonry';
import Poll from '../../components/Dashboard/Widgets/Poll/Poll';
import Suggestions from '../../components/Dashboard/Widgets/Suggestions';

import {
  Event as EventType,
  Poll as PollType,
  SuggestionWidget,
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

  const sSuggestion: SuggestionWidget = {
    uid: 'uid',
    owner: 'owner',
    title: 'title',
    suggestions: [
      {
        owner: 'a',
        option: 'option',
        upVotes: ['person1', 'person2', 'person3'],
        downVotes: [],
      },
      {
        owner: 'b',
        option: 'option',
        upVotes: ['person2', 'person3'],
        downVotes: [],
      },
      {
        owner: 'c',
        option: 'option',
        upVotes: ['person3'],
        downVotes: [],
      },
    ],
  };

  function CenterItem({ children }: { children: React.ReactNode }) {
    return (
      <Grid item xs={8} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {children}
      </Grid>
    );
  }

  function WidgetItem({ children }: { children: React.ReactNode }) {
    return (
      <Grid item xs={2}>
        {children}
      </Grid>
    );
  }

  return (
    <Grid container sx={{ padding: 2, backgroundColor: '#EFEFEF' }}>
      <Poll poll={sPoll} showResults={false} />
      <Suggestions suggestion={sSuggestion} />
      <Poll poll={sPoll} showResults={true} />

      <Day
        day={new Date()}
        events={[sEvent, sEvent]}
        joinableEvents={[sEvent, sEvent]}
        weatherIcon={<WbCloudy sx={{ fontSize: '32px' }} />}
        temperature={60}
      />
      <Day
        day={new Date()}
        events={[sEvent, sEvent]}
        joinableEvents={[sEvent, sEvent]}
        weatherIcon={<WbCloudy sx={{ fontSize: '32px' }} />}
        temperature={60}
      />
      <Day
        day={new Date()}
        events={[sEvent, sEvent]}
        joinableEvents={[sEvent, sEvent]}
        weatherIcon={<WbCloudy sx={{ fontSize: '32px' }} />}
        temperature={60}
      />

      <Poll poll={sPoll} showResults={false} />
      <Suggestions suggestion={sSuggestion} />
      <Poll poll={sPoll} showResults={true} />
    </Grid>
  );
}
