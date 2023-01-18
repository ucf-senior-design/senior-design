import { User } from '../utility/types/user';
import React, { useState } from 'react';
import { useAuth } from '../utility/hooks/authentication';
import { SelectListHook } from '../utility/hooks/selectList';
import {
  Button,
  FormControl,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { SelectChipList } from '../components/SelectChipList';
import { ArrowRight } from '@mui/icons-material';
import theme from '../styles/theme/Theme';
import { flexbox } from '@mui/system';

export default function Details() {
  const { addDetails, user } = useAuth();
  const [details, sDetails] = useState<User>({
    uid: '',
    email: '',
    name: '',
    profilePic: '',
    username: '',
    medicalInfo: [],
    allergies: [],
  });

  async function getStoredUserInfo() {
    if (user === undefined || user === null) {
      return;
    }
    sDetails((details) => ({
      ...details,
      uid: user.uid,
      email: user.email,
      profilePic: user.profilePic,
      name: user.name,
    }));
  }

  React.useEffect(() => {
    getStoredUserInfo();
  }, []);

  const foodAllergies = SelectListHook({
    options: ['egg', 'peanuts', 'tree nuts', 'milk', 'vegan'],
  });
  const medicalCond = SelectListHook({
    options: [
      'avoid crowds',
      'avoid unstable terrain',
      'avoid extended activity',
      'avoid flashing',
      'avoid loud noises',
    ],
  });
  const isUsernameInvalid = details.username.length === 0;
  const isNameInvalid = details.name.length === 0;

  // TODO: Implement this uploading profile picture.

  async function maybeFinishRegister() {
    const user: User = {
      ...details,
      medicalInfo: Array.from(medicalCond.values.selected),
      allergies: Array.from(foodAllergies.values.selected),
    };
    await addDetails(user, (response) => {
      if (!response.isSuccess) {
        alert(response.errorMessage);
      }
    });
  }

  /* TODO: Add go back button */

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 7,
            maxWidth: '500px',
            width: '80%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={$container}>
            <Typography
              sx={{ textAlign: 'center', fontSize: 25, fontStyle: 'black' }}
            >
              let's add some details
            </Typography>

            <TextField
              sx={{ width: '100%', marginTop: 2, marginBottom: 2 }}
              error={isNameInvalid}
              placeholder={isNameInvalid ? 'missing name' : undefined}
              value={details.name}
              label="name"
              onChange={(e) =>
                sDetails((details) => ({
                  ...details,
                  name: e.target.value,
                }))
              }
            />

            <TextField
              sx={{ width: '100%', marginTop: 2, marginBottom: 2 }}
              error={isUsernameInvalid}
              placeholder={isUsernameInvalid ? 'invalid username' : undefined}
              label="username"
              value={details.username}
              onChange={(e) =>
                sDetails((details) => ({
                  ...details,
                  username: e.target.value,
                }))
              }
            />
            
            <SelectChipList
              hook={foodAllergies}
              label="allergies"
              propertyName="allergy"
            />
            <SelectChipList
              hook={medicalCond}
              label="medical conditions"
              propertyName="medical condition"
            />

            <Button
              disabled={isNameInvalid || isUsernameInvalid}
              onClick={async () => {
                await maybeFinishRegister();
              }}
            >
              Continue <ArrowRight />
            </Button>
          </div>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

const $container: React.CSSProperties = {
  overflowY: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  paddingRight: 10,
  alignContent: 'center',
  flexGrow: 1,
  flexDirection: 'column',
};
