import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material"
import React from "react"
import { useState } from "react"
import PasswordStrengthBar from "react-password-strength-bar"
import theme from "../../../styles/theme/Theme"
import { useAuth } from "../../../utility/hooks/authentication"
import { useScreen } from "../../../utility/hooks/screen"
import { FormTextField } from "../FormTextField"
import LinkButton from "../LinkButton"
import { PasswordTextField } from "../PasswordTextField"
import ThirdPartyAuth from "../ThirdPartyAuth"

export const RegisterForm = () => {
  const [registerInfo, sRegisterInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState<string | undefined>()
  const { doEmailPasswordRegister } = useAuth()
  const { loading, updateLoading } = useScreen()
  const isValidEmail =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerInfo.email) === false
  const isConfirmPasswordInvalid = registerInfo.password !== registerInfo.confirmPassword
  const isPasswordInvalid = registerInfo.password.length < 8
  // /[A-Z]+/.test(registerInfo.password) === false ||
  // /[a-z]+/.test(registerInfo.password) === false ||
  // /[0-9]+/.test(registerInfo.password) === false ||
  // /[!#*$@_%+=&?]+/g.test(registerInfo.password) === false ||
  // /[-~’/`<>^(){}[\]|;:”\\.,]+/g.test(registerInfo.password) === true;

  React.useEffect(() => {
    updateLoading(false)
  }, [error])

  async function maybeRegister() {
    updateLoading(true)
    await doEmailPasswordRegister(
      {
        email: registerInfo.email,
        password: registerInfo.password,
      },
      (response) => {
        setError(response.errorMessage as string) // currently this is not displayed
      },
    )
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
          register
        </Typography>
        <Typography style={{ color: theme.palette.secondary.main, paddingBottom: 15 }}>
          please enter an email and password
        </Typography>
        <form>
          <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
            <FormTextField
              error={isValidEmail}
              helperText={isValidEmail ? "please enter a valid email" : ""}
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
              helperText={isPasswordInvalid ? "password must be at least 8 characters" : ""}
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
              helperText={isConfirmPasswordInvalid ? "passwords must match" : ""}
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
            <Button
              disabled={isValidEmail || isConfirmPasswordInvalid || isPasswordInvalid || loading}
              variant="contained"
              color="primary"
              sx={{ borderRadius: 1, mt: 5 }}
              aria-label="Sign up button"
              onClick={async () => maybeRegister()}
            >
              {loading ? <CircularProgress size={25} /> : "sign up now"}
            </Button>
          </Grid>
        </form>
        <p>
          <a style={{ paddingRight: 5 }}>already have an account?</a>
          <LinkButton link="/auth/login" text="log in instead" />
        </p>
      </Grid>
      <Divider role="log in with google or facebook accounts">
        <Typography variant="caption">or sign up with the following</Typography>
      </Divider>
      <ThirdPartyAuth />
    </Paper>
  )
}
