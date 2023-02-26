import { useDashboard } from '../../utility/hooks/dashboard';
import React from 'react';
import TripCard from './TripCard';
import { Autocomplete, Button, Paper, TextField } from '@mui/material';
import { Trip } from '../../utility/types/trip';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';

type TripSearchOption = {
  destination: string;
  start: string;
  id: string;
};
export default function ViewTrips() {
  const router = useRouter();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [tripSearchOptions, setTripSearchOptions] = React.useState<
    Array<TripSearchOption>
  >([]);
  const { trips } = useDashboard();

  React.useEffect(() => {
    let options: Array<TripSearchOption> = [];

    if (trips !== undefined) {
      trips.forEach((trip) => {
        options.push({
          id: trip.uid,
          start: `${
            monthNames[trip.duration.start.getMonth()]
          } ${trip.duration.start.getFullYear()}`,
          destination: trip.destination,
        });
      });
    }
    options = options.sort(
      (a, b) => -b.destination.localeCompare(a.destination)
    );
    setTripSearchOptions(options);
  }, [trips]);
  function CreateTripCards() {
    let tripCards: Array<React.ReactNode> = [];
    if (trips !== undefined) {
      trips.forEach((trip) => {
        tripCards.push(
          <TripCard
            key={trip.uid}
            uid={trip.uid}
            imageURI={trip.photoURL}
            destination={trip.destination}
          />
        );
      });
    }

    return (
      <Paper
        sx={{
          backgroundColor: 'transparent',
          padding: '10px',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'start',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {tripCards}
      </Paper>
    );
  }
  return (
    <>
      <Paper
        sx={{
          background: 'transparent',
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: { xs: 'center', md: 'end' },
          padding: '10px',
        }}
      >
        <Button
          sx={{ margin: '10px' }}
          variant="contained"
          color="primary"
          onClick={() => router.push('/dashboard/trip/create')}
        >
          New Trip
        </Button>
        <Autocomplete
          options={tripSearchOptions}
          groupBy={(option) => option.start}
          getOptionLabel={(option) => option.destination}
          sx={{ width: { xs: '100%', md: 300 }, margin: '10px' }}
          renderInput={(params) => (
            <TextField {...params} label="find trip" color="secondary" />
          )}
        />
      </Paper>
      <CreateTripCards />
    </>
  );
}
