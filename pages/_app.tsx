import { CacheProvider, EmotionCache } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import * as React from 'react';
import Screen from '../components/Screen';
import '../styles/globals.css';
import theme from '../styles/theme/Theme';
import createEmotionCache from '../utility/createEmotionCache';
import { AuthProvider } from '../utility/hooks/authentication';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const defaultTheme = createTheme(theme);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <CssBaseline />
          <Screen isLanding={props.router.asPath === '/'}>
            <Component {...pageProps} />
          </Screen>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
