import { useDashboard } from '../../utility/hooks/dashboard';
import React from 'react';
import TripCard from './TripCard';
import { Paper } from '@mui/material';
export default function ViewTrips() {
  const { trips } = useDashboard();

  function CreateTripCards() {
    let tripCards: Array<React.ReactNode> = [];
    if (trips !== undefined) {
      trips.forEach((trip) => {
        tripCards.push(
          <TripCard
            key={trip.uid}
            uid={trip.uid}
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
      <CreateTripCards />
    </>
  );
}
