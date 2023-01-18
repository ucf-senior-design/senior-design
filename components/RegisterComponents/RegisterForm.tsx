import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import theme from '../../styles/theme/Theme';
import LinkButton from '../LinkButton';
import LoginButton from './RegisterButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const RegisterForm = () => {
  const [registerInfo, sRegisterInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      xs={3}
      style={{ color: theme.palette.tertiary.main }}
    >
      <Paper
        elevation={3}
        style={{
          background: theme.palette.secondary.main,
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
              color: theme.palette.tertiary.main,
              padding: 5,
            }}
          >
            register
          </Typography>
          <Typography
            style={{ color: theme.palette.tertiary.main, paddingBottom: 15 }}
          >
            please enter an email and password
          </Typography>
          <form>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <TextField
                required
                id="email-input"
                value={registerInfo.email}
                label="email"
                placeholder="email@domain.com"
                onChange={(e) =>
                  sRegisterInfo((registerInfo) => ({
                    ...registerInfo,
                    email: e.target.value,
                  }))
                }
                sx={{ marginBottom: 3 }}
              />

              <TextField
                required
                id="password-input"
                value={registerInfo.password}
                label="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                onChange={(e) =>
                  sRegisterInfo((registerInfo) => ({
                    ...registerInfo,
                    password: e.target.value,
                  }))
                }
                sx={{mb:3}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                id="confirm-password-input"
                value={registerInfo.confirmPassword}
                label="confirm password"
                type={showPassword ? 'text' : 'password'}
                placeholder="confirm password"
                onChange={(e) =>
                  sRegisterInfo((registerInfo) => ({
                    ...registerInfo,
                    confirmPassword: e.target.value,
                  }))
                }
                sx={{ marginBottom: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: 2, marginTop: 1 }}
              >
              </Grid>
              <LoginButton
                email={registerInfo.email}
                password={registerInfo.password}
              />
            </Grid>
          </form>
          {/* <p>
            <a style={{ paddingRight: 5 }}>don&apos;t have an account?</a>
            <LinkButton link="/" text="sign up" />
          </p> */}
            <p>
              <a style={{paddingRight:5}}>already have an account?</a>
              <LinkButton link="/Login" text="log in instead" />
            </p>
        </Grid>
        <Divider role="log in with google or facebook accounts">
          <Typography variant="caption">
            or sign up with the following
          </Typography>
        </Divider>
      </Paper>
    </Grid>
  );
};
