import { useRouter } from 'next/router';
import { SuggestionWidgets } from '../../../components/Dashboard/Widgets/Suggestions';
import { TripProvider } from '../../../utility/hooks/trip';

export default function Trip() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <TripProvider id={id as string}>
      <SuggestionWidgets />
    </TripProvider>
  );
}
