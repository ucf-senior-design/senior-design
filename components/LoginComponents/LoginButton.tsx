import { Button} from '@mui/material';
import Link from 'next/link';

export const LoginButton = () => {
  return (
    <Link href="/" passHref>
      <Button variant="contained" color="primary" aria-label="Sign up button">
        login
      </Button>
    </Link>
  );
};

export default LoginButton;
