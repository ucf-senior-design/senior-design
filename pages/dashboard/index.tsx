import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../utility/hooks/authentication';
import { useDashboard } from '../../utility/hooks/dashboard';

export default function Index() {
  const { user } = useAuth();
  const { trips, getTrips } = useDashboard();
  const router = useRouter();

  console.log(trips);

  React.useEffect(() => {
    getTrips();
  }, []);

  function GetTripCards() {
    const tripCards: Array<React.ReactNode> = [];

    if (trips !== undefined) {
      trips.forEach((trip) => {
        tripCards.push(
          <Button
            onClick={() =>
              router.push(`/trip/`, {
                query: { id: trip.uid },
                pathname: 'dashboard/trip/',
              })
            }
          >
            {trip.destination}
          </Button>
        );
      });
    }

    return <> {tripCards} </>;
  }
  return (
    <p>
      <GetTripCards />
    </p>
  );
}
