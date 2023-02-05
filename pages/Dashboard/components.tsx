import { Box } from '@mui/system';
import Event from '../../components/Dashboard/Event';
import JoinableEvent from '../../components/Dashboard/JoinableEvent';
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
  return (
    <Box gap={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Event event={sEvent} />
      <JoinableEvent event={sEvent} />
      <Poll poll={sPoll} showResults={false} />
      <Poll poll={sPoll} showResults={true} />
      <Suggestions suggestion={sSuggestion} />
    </Box>
  );
}
