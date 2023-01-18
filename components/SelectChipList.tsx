import { Add } from '@mui/icons-material';
import { Button, FormLabel, IconButton, TextField } from '@mui/material';
import React from 'react';
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
          <text style={{ fontSize: 12, fontStyle: 'bold' }}>{option}</text>
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
        <TextField
          label={`add ${propertyName}`}
          onChange={(e) => {
            hook.updateOptionInput(e.target.value);
          }}
        />
        <Button onClick={() => hook.addOption()}> Add </Button>
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
  backgroundColor: '#283051',
  paddingTop: 8,
  paddingBottom: 8,
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
  backgroundColor: '#4262BF',
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 3,
  alignSelf: 'center',
};

const $container: React.CSSProperties = {
  flexDirection: 'column',
  width: '100%',
};
