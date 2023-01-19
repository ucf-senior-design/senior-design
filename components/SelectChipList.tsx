import { Add } from '@mui/icons-material';
import {
  Button,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import theme from '../styles/theme/Theme';
import { SelectListHook } from '../utility/hooks/selectList';
import { BackdropModal } from './BackdropModal';

export interface SelectChipListProps {
  updateSelected: (value: string) => void;
  options: Map<string, boolean>;
}

export function SelectChipList({
  hook,
  label,
  propertyName,
}: {
  /**
   * Handles all operations to handle selecting options.
   */
  hook: SelectListHook;
  /**
   * Label for the form.
   */
  label: string;
  /**
   * Property name to be used in popup ( should be singular)
   */
  propertyName: string;
}) {
  const chips: Array<any> = [];

  hook.values.options.forEach((option, index) => {
    chips.push(
      <button
        key={index}
        onClick={() => hook.updateSelected(option)}
        style={hook.isSelected(option) ? $selectedChip : $chip}
      >
        <div>
          <text style={{ fontSize: 16, fontStyle: 'bold' }}>{option}</text>
        </div>
      </button>
    );
  });

  return (
    <>
      <div style={$container}>
        <FormLabel> {label}</FormLabel>
        <div style={$chipContainer}>
          {chips}
          <div style={$addOption}>
            <IconButton onClick={() => hook.togglePopUp()}>
              <Add sx={{ fontSize: 20 }} />
            </IconButton>
          </div>
        </div>
      </div>

      <BackdropModal
        isOpen={hook.values.isPopUpVisible}
        toggleShow={() => hook.togglePopUp()}
      >
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            maxWidth: '300px',
            width: '80%',
            gap: 10,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {`Add  custom ${label}`}
          </Typography>
          <TextField
            label={`add ${propertyName}`}
            onChange={(e) => {
              hook.updateOptionInput(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => hook.addOption()}
          >
            {' '}
            Add{' '}
          </Button>
        </div>
      </BackdropModal>
    </>
  );
}

const $addOption: React.CSSProperties = {
  margin: 4,
  padding: 2,
};

const $chipContainer: React.CSSProperties = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  width: '100%',
  alignContent: 'center',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 2,
};

const $chip: React.CSSProperties = {
  margin: 4,
  backgroundColor: theme.palette.primary.contrastText,
  paddingTop: 15,
  paddingBottom: 15,
  border: 'none',
  paddingLeft: 20,
  boxShadow: 'none',
  paddingRight: 20,
  borderRadius: 3,
  alignSelf: 'center',
};

const $selectedChip: React.CSSProperties = {
  margin: 4,
  border: 'none',
  backgroundColor: '#9996BC',
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 3,
  alignSelf: 'center',
};

const $container: React.CSSProperties = {
  flexDirection: 'column',
  width: '100%',
};
