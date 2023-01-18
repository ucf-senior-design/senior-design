import { User } from '../utility/types/user';
import React, { useState } from 'react';
import { useAuth } from '../utility/hooks/authentication';
import { SelectListHook } from '../utility/hooks/selectList';
import { Button, TextField, Typography } from '@mui/material';
import { SelectChipList } from '../components/SelectChipList';
import { ArrowRight } from '@mui/icons-material';

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

  async function maybeUpdatePicture() {
    // TODO: Implement this.
  }

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
  return (
    <div>
      {/* TODO: Add go back button */}
      <div style={{ flex: 1 }}>
        <div style={$container}>
          <Typography
            variant="h1"
            style={{ textAlign: 'center', fontSize: 25 }}
          >
            {' '}
            let's add some details"
          </Typography>

          <TextField
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
      </div>
    </div>
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
