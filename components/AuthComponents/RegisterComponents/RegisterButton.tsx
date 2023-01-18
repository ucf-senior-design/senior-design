import { Button, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import theme from '../../../styles/theme/Theme';

export const RegisterButton = ({
  email,
  password,
}: {
  email: String;
  password: String;
}) => {
  console.log(email, password);
  return (
    <ThemeProvider theme={theme}>
      <Link href="/" passHref>
        <Button
          variant="contained"
          color="tertiary"
          sx={{ borderRadius: 1, mt: 5 }}
          aria-label="Sign up button"
        >
          sign up now
        </Button>
      </Link>
    </ThemeProvider>
  );
};

export default RegisterButton;
