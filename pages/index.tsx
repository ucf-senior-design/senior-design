import { Grid, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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
        <div className={[styles.elementToHide, styles.cloud].join(" ")}>
          <Image src='/cloud.svg' alt="Cloud" layout='fill' />
        </div>
        <div className={[styles.elementToHide, styles.blueRectangle].join(" ")}>
          <Image src='/blueRectangle.svg' alt="Blue Rectangle" layout='fill' />
        </div>
        <div className={styles.people}>
          <Image src='/people.svg' alt="Group of people" height={380} width={700} />
        </div>
        <div className={[styles.elementToHide, styles.plane].join(" ")}>
          <Image src='/plane.svg' alt="Plane" height={400} width={850} />
        </div>
      </main>
    </div>
  );
};

export default Home;
