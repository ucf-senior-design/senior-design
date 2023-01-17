import { Grid, Stack, Typography } from '@mui/material';
import SignUpButton from './SignUpButton';
import Image from 'next/image';
export default function Hero() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{
          zIndex: 5,
          height: '100vh',
          position: 'relative',
        }}
        sx={{ p: 3 }}
      >
        <Typography
          variant="h2"
          style={{ fontWeight: 500, color: 'white' }}
          sx={{ mb: 2, fontSize: { xs: '42px', md: '72px' } }}
        >
          welcome to your personal trip planner
        </Typography>
        <Typography
          variant="h2"
          style={{ fontWeight: 400, color: 'white' }}
          sx={{ mb: 4, fontSize: { xs: '24px', md: '30px' } }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <SignUpButton />
      </Grid>
      <Stack
        sx={{ display: { sm: 'none' } }}
        style={{
          height: '100vw',
          width: '100vh',
          display: 'absolute',
          zIndex: 1,
        }}
      >
        <Image
          src="/landingMobile.svg"
          alt="Landing"
          layout={'fill'}
          objectFit={'cover'}
        />
      </Stack>
      <Stack
        sx={{ display: { xs: 'none', sm: 'block' } }}
        style={{
          height: '100vw',
          width: '100vh',
          display: 'absolute',
          zIndex: 1,
        }}
      >
        <Image
          src="/landing.svg"
          alt="Landing"
          layout={'fill'}
          objectFit={'cover'}
        />
      </Stack>
    </>
  );
}
