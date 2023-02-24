import { useRouter } from 'next/router';
import React from 'react';
import Schedule from '../../../components/Dashboard/Schedule';
import { SuggestionWidgets } from '../../../components/Dashboard/Widgets/Suggestions';
import { TripProvider } from '../../../utility/hooks/trip';

export default function Trip() {
  const router = useRouter();
  const [tripID, setTripID] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const { id } = router.query;

    setTripID(id as string | undefined);
  }, [router]);

  return tripID !== undefined ? (
    <TripProvider id={tripID}>
      <SuggestionWidgets />
      <Schedule />
    </TripProvider>
  ) : (
    <div> loading</div>
  );
}
