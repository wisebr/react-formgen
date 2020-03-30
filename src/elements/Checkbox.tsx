import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

export interface CheckboxProps extends BaseElementProps<boolean> {
  inputRef?: React.Ref<any>;
  onChange?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({value, required, disabled, label, helpTip, onChange, name, inputRef, error }) => {
  const commonClasses = useCommonStyles();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(ev.target.checked);
    }
  };

  return (
    <FormControl
      className={commonClasses.element}
      required={required}
      disabled={disabled}
      error={!!error}
    >
      <FormControlLabel
        label={<ElementLabel text={label} tip={helpTip} />}
        control={
          <MuiCheckbox inputRef={inputRef} name={name} checked={value} onChange={handleChange} />
        }
      />
    </FormControl>
  );
};

export default React.memo(Checkbox);
