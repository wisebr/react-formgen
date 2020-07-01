import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';

export interface CheckboxProps extends BaseElementProps<boolean> {
  inputRef?: React.Ref<any>;
  onChange?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value, required, disabled, label, onChange, name, inputRef, error, scene
}) => {
  const commonClasses = useCommonStyles();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(ev.target.checked);
    }
  };

  const rest = scene === 'previewer' ? {checked: value} : null;

  return (
    <FormControl
      className={commonClasses.element}
      required={required}
      disabled={disabled}
      error={!!error}
    >
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox inputRef={inputRef} name={name} {...rest} onChange={handleChange} />
        }
      />
    </FormControl>
  );
};

export default React.memo(Checkbox);
