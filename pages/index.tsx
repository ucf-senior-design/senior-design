import { Grid, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import type { NextPage } from 'next';
import Head from 'next/head';
import BlueFooter from '../src/assets/blueFooter';
import Cloud from '../src/assets/cloud';
import styles from '../styles/Home.module.css';
import SignUpButton from './components/SignUpButton';

const Home: NextPage = () => {
  const theme = useTheme();
  return (
    <div>
      <Head>
        <title>Complanion</title>
        <meta name="description" content="Trip planning application enerated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{background:theme.palette.primary.light}}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{p:3}}>
            <Typography variant='h2' style={{fontWeight:500, color:theme.palette.lace.main}} sx={{mb:2}}>welcome to your personal trip planner.</Typography>
            <SignUpButton />
        </Grid>
        <img src='./people.png' alt="Group of People" className={styles.people} />
        <Cloud />
        <BlueFooter />
      </main>
    </div>
  );
};

export default Home;
