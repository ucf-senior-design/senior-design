import { Divider, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import theme from '../../../styles/theme/Theme';
import { FormTextField } from '../FormTextField';
import LinkButton from '../LinkButton';
import { PasswordTextField } from '../PasswordTextField';
import RegisterButton from './RegisterButton';

export const RegisterForm = () => {
  const [registerInfo, sRegisterInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const isConfirmPasswordInvalid =
    registerInfo.password !== registerInfo.confirmPassword;
  const isPasswordInvalid =
    registerInfo.password.length < 8 ||
    /[A-Z]+/.test(registerInfo.password) === false ||
    /[a-z]+/.test(registerInfo.password) === false ||
    /[0-9]+/.test(registerInfo.password) === false ||
    /[!#*$@_%+=&?]+/g.test(registerInfo.password) === false ||
    /[-~’/`<>^(){}[\]|;:”\\.,]+/g.test(registerInfo.password) === true;

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
              <FormTextField
                error={isError}
                helperText={error}
                id="registerEmailInput"
                value={registerInfo.email}
                label="email"
                placeholder="email@domain.com"
                onChange={(e: { target: { value: string } }) =>
                  sRegisterInfo((registerInfo) => ({
                    ...registerInfo,
                    email: e.target.value,
                  }))
                }
              />

              <PasswordTextField
                error={isPasswordInvalid ? true : false}
                helperText={
                  isPasswordInvalid ? 
                  <>
                    - must contain at least 8 characters <br />
                    - must contain one uppercase and one lowercase letter <br />
                    - must contain at least one digit <br />
                    - must have at least one of the following characters: !#*$@_%+=&?
                  </> : ''
                }
                id="registerPasswordInput"
                value={registerInfo.password}
                label="password"
                placeholder="password"
                onChange={(e: { target: { value: string } }) =>
                  sRegisterInfo((registerInfo) => ({
                    ...registerInfo,
                    password: e.target.value,
                  }))
                }
              />

              <PasswordStrengthBar password={registerInfo.password} />

              <PasswordTextField
                error={isConfirmPasswordInvalid ? true : false}
                helperText={
                  isConfirmPasswordInvalid ? 'does not match password' : ''
                }
                id="confirmPasswordInput"
                value={registerInfo.confirmPassword}
                label="confirm password"
                placeholder="confirm password"
                onChange={(e: { target: { value: string } }) =>
                  sRegisterInfo((registerInfo) => ({
                    ...registerInfo,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              <RegisterButton
                email={registerInfo.email}
                password={registerInfo.password}
              />
            </Grid>
          </form>
          <p>
            <a style={{ paddingRight: 5 }}>already have an account?</a>
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
