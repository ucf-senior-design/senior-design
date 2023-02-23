import SecurePage from '../../components/SecurePage';
import { useAuth } from '../../utility/hooks/authentication';

export default function Index() {
  const { user } = useAuth();
  return (
    <SecurePage>
      <p>{user?.uid + '\t' + user?.name + '\t' + user?.medicalInfo + '\t'}</p>
    </SecurePage>
  );
}
