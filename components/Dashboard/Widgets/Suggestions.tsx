import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../../../utility/hooks/authentication';
import {
  SuggestionOption,
  SuggestionWidget,
} from '../../../utility/types/trip';
import Avatar from '../../Avatar';
import WidgetHeader from './WidgetHeader';
import Image from 'next/image';
import {
  Add,
  Favorite,
  FavoriteBorder,
  HeartBrokenOutlined,
} from '@mui/icons-material';

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
    <Grid container>
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
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        {suggestion.upVotes.includes(user?.uid ?? '') ? (
          <Favorite
            sx={{ color: 'pink' }}
            onClick={() => console.log('handle unselecting favorite')}
          />
        ) : (
          <FavoriteBorder
            sx={{ color: 'pink' }}
            onClick={() => console.log('handle selecting favorite.')}
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
    <Paper sx={{ padding: '20px', width: '80vw', maxWidth: '300px' }}>
      <WidgetHeader
        owner={suggestion.owner}
        rightAccessory={
          <Button
            onClick={() => {
              /** TODO: Handle Adding a Suggestion */
              console.log('Add Suggestion');
            }}
          >
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
