import { Button, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import theme from '../../../styles/theme/Theme';
import { useAuth } from '../../../utility/hooks/authentication';

export function SendEmail({
  purpose,
}: {
  purpose: 'emailVerify' | 'passwordReset';
}) {
  const { sendEmailVerification, sendPasswordReset } = useAuth();
  const title = purpose === 'emailVerify' ? 'almost there!' : 'password reset';
  const message =
    purpose === 'emailVerify'
      ? 'Check your email and click on the link we sent to activate your account.'
      : 'Check your email for a link to reset your password.';
  React.useEffect(() => {
    handleEmailSend();
  }, []);

  async function handleEmailSend() {
    if (purpose === 'emailVerify') {
      sendEmailVerification((response) => {
        if (!response.isSuccess) {
          alert(response.errorMessage);
        }
      });
    }
    if (purpose === 'passwordReset') {
      sendPasswordReset((response) => {
        if (!response.isSuccess) {
          alert(response.errorMessage);
        } else {
          alert('Password reset email sent.');
        }
      });
    }
  }
  return (
    <Grid
      item
      justifyContent="space-evenly"
      alignItems="stretch"
      sx={{ minWidth: '300px', width: '90%', maxWidth: '600px' }}
      xs={5}
      md={3}
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
            {title}
          </Typography>
          <Typography
            style={{ color: theme.palette.secondary.main, paddingBottom: 15 }}
          >
            {message}
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
          >
            <Image src="/email.svg" alt="Email" width={400} height={400} />
            {purpose === 'emailVerify' && (
              <Button
                variant="outlined"
                aria-label="login"
                sx={{ borderRadius: 1 }}
                color="primary"
                onClick={() => Router.push('/Auth/Login')}
              >
                {' '}
                log in{' '}
              </Button>
            )}
            <Button
              variant="contained"
              aria-label="resend email"
              sx={{ borderRadius: 1 }}
              color="primary"
              onClick={() => handleEmailSend()}
            >
              resend email
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
