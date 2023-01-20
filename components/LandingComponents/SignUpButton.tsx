import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import Link from 'next/link';

export const SignUpButton = () => {
  return (
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
  );
};

export default SignUpButton;
