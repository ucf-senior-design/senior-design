import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import theme from '../../../styles/theme/Theme';
import { useAuth } from '../../../utility/hooks/authentication';
import { FormTextField } from '../FormTextField';
import LinkButton from '../LinkButton';
import { PasswordTextField } from '../PasswordTextField';
import ThirdPartyAuth from '../ThirdPartyAuth';

import Router from 'next/router';
import { useScreen } from '../../../utility/hooks/screen';

export const LoginForm = () => {
  const [loginInfo, sLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { loading, toggleLoading } = useScreen();
  //const { firebaseLogin, user } = useAuth();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const { doEmailPasswordLogin } = useAuth();
  // const history = useNavigate();

  async function handleSubmit() {
    toggleLoading();
    await doEmailPasswordLogin(loginInfo, (response) => {
      if (response.isSuccess) {
        Router.push('/');
      } else {
        setError('Incorrect username or password');
        setIsError(true);
      }
      toggleLoading();
    });
  }

  return (
    <Grid
      item
      justifyContent="space-evenly"
      alignItems="stretch"
      xs={5}
      md={3}
      style={{ color: theme.palette.tertiary.main, maxWidth: 500 }}
    >
      <Paper
        elevation={3}
        style={{
          background: theme.palette.background.paper,
          padding: 20,
          paddingBottom: 40,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: 500,
              color: theme.palette.secondary.main,
              padding: 5,
            }}
          >
            login
          </Typography>
          <Typography
            style={{ color: theme.palette.secondary.main, paddingBottom: 15 }}
          >
            enter your details to log in
          </Typography>
          <form>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <FormTextField
                error={isError}
                helperText=""
                id="emailInput"
                value={loginInfo.email}
                label="email"
                placeholder="email@domain.com"
                onChange={(e: { target: { value: string } }) =>
                  sLoginInfo((loginInfo) => ({
                    ...loginInfo,
                    email: e.target.value,
                  }))
                }
              />

              <PasswordTextField
                error={isError}
                helperText={error}
                id="passwordInput"
                value={loginInfo.password}
                label="password"
                placeholder="password"
                onChange={(e: { target: { value: string } }) =>
                  sLoginInfo((loginInfo) => ({
                    ...loginInfo,
                    password: e.target.value,
                  }))
                }
              />

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: 4, marginTop: 1 }}
              >
                <LinkButton
                  link="/Auth/PasswordReset"
                  text="forgot your password?"
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ borderRadius: 1 }}
                aria-label="Sign in button"
                onClick={() => handleSubmit()}
              >
                {loading ? <CircularProgress size={25} /> : 'sign in'}
              </Button>
            </Grid>
          </form>
          <p>
            <a style={{ paddingRight: 5 }}>don&apos;t have an account?</a>
            <LinkButton link="/Auth/Register" text="sign up" />
          </p>
        </Grid>
        <Divider role="log in with google or facebook accounts">
          <Typography variant="caption">
            or log in with the following
          </Typography>
        </Divider>
        <ThirdPartyAuth />
      </Paper>
     
    </Grid>
  );
};
