import { Luggage } from '@mui/icons-material';
import React from 'react';
import DashboardHeader from '../../components/Dashboard/PageHeader';
import TripCard from '../../components/Dashboard/TripCard';
import ViewTrips from '../../components/Dashboard/ViewTrips';
import { DashboardProvider } from '../../utility/hooks/dashboard';
import { useScreen } from '../../utility/hooks/screen';

export default function Index() {
  const { updateAutoPadding } = useScreen();

  React.useEffect(() => {
    updateAutoPadding(false);
  }, []);

  return (
    <DashboardProvider>
      <DashboardHeader
        icon={
          <Luggage
            sx={{ color: 'white', fontWeight: '700', fontSize: '40px' }}
          />
        }
        title="trips"
      />
      <ViewTrips />
    </DashboardProvider>
  );
}
