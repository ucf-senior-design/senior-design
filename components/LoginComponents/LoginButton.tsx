import { Button, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import theme from '../../styles/theme/Theme';

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
