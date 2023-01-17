import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/LandingComponents/Hero';
import Info from '../components/LandingComponents/Info';
import SignUpButton from '../components/LandingComponents/SignUpButton';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const theme = useTheme();
  return (
    <div>
      <Head>
        <title>Complanion</title>
        <meta
          name="description"
          content="Trip planning application generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            padding: 0,
            zIndex: 5,
            gap: 0,
            position: 'absolute',
            left: 0,
          }}
        >
          <div style={{ height: '100vh' }}>
            <Hero />
          </div>
          <div>
            <Info />
          </div>
          <div style={{ position: 'absolute', zIndex: 5, bottom: 0 }}>
            <Image
              src="/Mountains.svg"
              alt="Image of Mountains"
              layout="fill"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
