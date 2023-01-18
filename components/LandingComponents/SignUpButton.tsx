import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import theme from '../../styles/theme/Theme';

export const SignUpButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Link href="/Register" passHref>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          color="landing"
          aria-label="Sign up button"
          sx={{ fontSize: '18px', color: 'white', borderColor: 'white' }}
        >
          get started
        </Button>
      </Link>
    </ThemeProvider>
  );
};

export default SignUpButton;
