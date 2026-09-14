import { TextField as MuiTextField } from '@mui/material';
import React from 'react';

import { commonSx } from '../styles';
import { BaseElementProps } from '../types';

export interface NumberFieldProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  value, required, disabled, label, onChange, name, inputRef, error, scene
}) => {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(ev.target.value);
    }
  };
  const rest = scene === 'renderer' ? {defaultValue: value} : {value};

  return (
    <MuiTextField
      inputRef={inputRef}
      sx={commonSx.element}
      label={label}
      name={name}
      {...rest}
      type="number"
      required={required}
      disabled={disabled}
      onChange={handleChange}
      error={!!error}
    />
  );
};

export default React.memo(NumberField);
