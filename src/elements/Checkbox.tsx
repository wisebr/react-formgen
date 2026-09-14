import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@mui/material';
import React from 'react';

import { commonSx } from '../styles';
import { BaseElementProps } from '../types';

export interface CheckboxProps extends BaseElementProps<boolean> {
  inputRef?: React.Ref<any>;
  onChange?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value, disabled, label, onChange, name, inputRef, error, scene
}) => {
  const [inputVal, setInputVal] = React.useState(value);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(ev.target.checked);
    if (onChange) {
      onChange(ev.target.checked);
    }
  };

  const rest = scene === 'previewer' ? {checked: value, value: value ? 'on' : 'off'} : {checked: inputVal};

  return (
    <FormControl
      sx={commonSx.element}
      disabled={disabled}
      error={!!error}
    >
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox
            inputRef={inputRef}
            name={name}
            {...rest}
            onChange={handleChange}
          />
        }
      />
    </FormControl>
  );
};

export default React.memo(Checkbox);
