import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';

export const SignUpButton = () => {
  return (
    <>
      <Stack sx={{ display: { sm: 'none' } }}>
        <Link href="/Register" passHref>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            color="landing"
            aria-label="Sign up button"
            sx={{ fontSize: '18px', color: 'black', borderColor: 'black' }}
          >
            get started
          </Button>
        </Link>
      </Stack>
      <Stack sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Link href="/Auth/Register" passHref>
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
      </Stack>
    </>
  );
};

export default SignUpButton;
