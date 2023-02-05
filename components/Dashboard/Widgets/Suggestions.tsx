import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../../../utility/hooks/authentication';
import {
  SuggestionOption,
  SuggestionWidget,
} from '../../../utility/types/trip';
import Avatar from '../../Avatar';
import WidgetHeader from './WidgetHeader';
import Image from 'next/image';

function VoteButton({
  image,
  handleOnClick,
}: {
  image: string;
  handleOnClick: () => void;
}) {
  return (
    <Button onClick={handleOnClick}>
      <Image src={image} width={25} height={25} />
    </Button>
  );
}

function Suggestion({ suggestion }: { suggestion: SuggestionOption }) {
  const { user } = useAuth();
  const upvoteSelected = '/upvote-selected.svg';
  const upvoteUnSelected = '/upvote-unselected.svg';
  const downvoteSelected = '/downvote-selected.svg';
  const downvoteUnSelected = '/downvote-unselected.svg';

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {/** TODO: Ensure Trip Hook has a way to store owner information and get the user's name from this. */}
      <Grid
        item
        xs={8}
        sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}
      >
        <Avatar name={suggestion.owner} />
        <Typography> {suggestion.option}</Typography>
      </Grid>

      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 0,
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Box sx={{ gap: 0 }}>
          {user !== null &&
          user?.uid !== undefined &&
          suggestion.upVotes.includes(user?.uid) ? (
            <VoteButton
              image={upvoteSelected}
              handleOnClick={() => {
                console.log('upvote selected clicked');
              }}
            />
          ) : (
            <VoteButton
              image={upvoteUnSelected}
              handleOnClick={() => {
                console.log('upvote unselected clicked');
              }}
            />
          )}
          {suggestion.upVotes.length - suggestion.downVotes.length}
        </Box>
        {user !== null &&
        user?.uid !== undefined &&
        suggestion.downVotes.includes(user?.uid) ? (
          <VoteButton
            image={downvoteSelected}
            handleOnClick={() => {
              console.log('downvote selected clicked');
            }}
          />
        ) : (
          <VoteButton
            image={downvoteUnSelected}
            handleOnClick={() => {
              console.log('downvote unselected clicked');
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
export default function Suggestions({
  suggestion,
}: {
  suggestion: SuggestionWidget;
}) {
  return (
    <Paper sx={{ padding: '20px' }}>
      <WidgetHeader owner={suggestion.owner} />
      <Typography
        sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}
      >
        {suggestion.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {suggestion.suggestions.map((suggestion, index) => {
          if (index < 5) {
            return <Suggestion key={index} suggestion={suggestion} />;
          }
        })}
      </Box>
      {suggestion.suggestions.length >= 5 && (
        <Button variant="text"> view more</Button>
      )}
    </Paper>
  );
}
