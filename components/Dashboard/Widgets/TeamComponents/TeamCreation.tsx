import {
  Button, Grid, Paper,
  Typography
} from '@mui/material';
import { useState } from 'react';
import theme from '../../../../styles/theme/Theme';
import { FormTextField } from '../../../AuthComponents/FormTextField';
import LinkButton from '../../../AuthComponents/LinkButton';


  export const TeamCreation = () => {
    const [teamInfo, sTeamInfo] = useState({
        members: [],
      });
  
    return (
      <Paper
        elevation={3}
        style={{
          maxWidth: '900px',
          width: '80vw',
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
            create your team
          </Typography>
          <Typography
            style={{ color: theme.palette.secondary.main, paddingBottom: 15 }}
          >
            currently added members
          </Typography>
          <form>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <FormTextField
                id="currentlyAddedMembers"
                value={""}
                placeholder="no currently added members"
              />
  
              {/* <PasswordTextField
                error={isPasswordInvalid ? true : false}
                helperText={
                  isPasswordInvalid
                    ? 'password must be at least 8 characters'
                    : ''
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
                  isConfirmPasswordInvalid ? 'passwords must match' : ''
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
              /> */}
              <Button
                // disabled={
                //   isValidEmail ||
                //   isConfirmPasswordInvalid ||
                //   isPasswordInvalid ||
                //   loading
                // }
                // variant="contained"
                // color="primary"
                // sx={{ borderRadius: 1, mt: 5 }}
                // aria-label="Sign up button"
                // onClick={async () => maybeRegister()}
               >
                 {/* {loading ? <CircularProgress size={25} /> : 'sign up now'} */}
              </Button>
            </Grid>
          </form>
          <p>
            <a style={{ paddingRight: 5 }}>search users by username</a>
          <p>
          <LinkButton link="/" text="add to team" />
          </p>
          </p>
        </Grid>
      </Paper>
    );
  };
  