import { useAuth } from '../../utility/hooks/authentication';

export default function Index() {
  const { user } = useAuth();
  return (
    <p>{user?.uid + '\t' + user?.name + '\t' + user?.medicalInfo + '\t'}</p>
  );
}
