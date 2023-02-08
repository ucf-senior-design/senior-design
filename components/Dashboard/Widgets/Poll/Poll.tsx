import { Paper, Typography } from '@mui/material';
import { Poll as PollType } from '../../../../utility/types/trip';
import WidgetHeader from '../WidgetHeader';
import PollResult from './PollResult';
import PollVote from './PollVote';

export default function Poll({
  poll,
  showResults,
}: {
  poll: PollType;
  showResults: boolean;
}) {
  return (
    <Paper sx={{ padding: '20px', width: '80vw', maxWidth: '300px' }}>
      <WidgetHeader owner={poll.owner} />
      <Typography
        sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}
      >
        {poll.title}
      </Typography>
      {showResults ? (
        <PollResult options={poll.options} />
      ) : (
        <PollVote options={poll.options} />
      )}
    </Paper>
  );
}
