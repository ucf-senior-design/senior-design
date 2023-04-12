import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material"
import { useState } from "react"
import theme from "../../../styles/theme/Theme"
import { useAuth } from "../../../utility/hooks/authentication"
import { FormTextField } from "../FormTextField"
import LinkButton from "../LinkButton"
import { PasswordTextField } from "../PasswordTextField"
import ThirdPartyAuth from "../ThirdPartyAuth"

import Router from "next/router"
import { useScreen } from "../../../utility/hooks/screen"
import React from "react"

export const LoginForm = () => {
  const [loginInfo, sLoginInfo] = useState({
    email: "",
    password: "",
  })
  const { loading, updateLoading, updateErrorToast } = useScreen()
  const [error, setError] = useState<string | undefined>()

  const { doEmailPasswordLogin } = useAuth()

  React.useEffect(() => {
    updateLoading(false)
  }, [error])

  async function handleSubmit() {
    updateLoading(true)
    await doEmailPasswordLogin(loginInfo, (response) => {
      if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
        updateErrorToast("invalid login info.")
      }
      if (response.isSuccess) {
        Router.push("/")
      } else {
        updateErrorToast(response.errorMessage)
      }
    })
  }

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "400px",
        width: "80vw",
        background: theme.palette.background.paper,
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="center">
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
        <Typography style={{ color: theme.palette.secondary.main, paddingBottom: 15 }}>
          enter your details to log in
        </Typography>
        <form>
          <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
            <FormTextField
              error={error !== undefined}
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
              error={error !== undefined}
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
              <LinkButton link="/auth/passwordReset" text="forgot your password?" />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ borderRadius: 1 }}
              aria-label="Sign in button"
              onClick={() => handleSubmit()}
            >
              {loading ? <CircularProgress size={25} /> : "sign in"}
            </Button>
          </Grid>
        </form>
        <p>
          <a style={{ paddingRight: 5 }}>don&apos;t have an account?</a>
          <LinkButton link="/auth/register" text="sign up" />
        </p>
      </Grid>
      <Divider role="log in with google or facebook accounts">
        <Typography variant="caption">or log in with the following</Typography>
      </Divider>
      <ThirdPartyAuth />
    </Paper>
  )
}
