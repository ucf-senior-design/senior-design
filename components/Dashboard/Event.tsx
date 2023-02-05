import { LocationOn } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import { Event as EventType } from '../../utility/types/trip';
import Avatar from '../Avatar';
export default function Event({ event }: { event: EventType }) {
  function getTime(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return (
    <Paper sx={{ padding: '20px' }}>
      <Grid container>
        <Grid item xs={8}>
          <Grid container columnGap={2} alignItems={'center'}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {event.title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'medium',
                textTransform: 'uppercase',
                fontSize: '14px',
              }}
            >
              {`${getTime(event.duration.start)} - ${getTime(
                event.duration.end
              )}`}
            </Typography>
          </Grid>
          <Grid container columnGap={1} alignItems={'center'}>
            <LocationOn />{' '}
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {event.location}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'end',
              height: '100%',
              gap: '10px',
            }}
          >
            {event.attendees.map((attendee, index) => {
              return <>{index < 3 && <Avatar name={attendee} />}</>;
            })}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
