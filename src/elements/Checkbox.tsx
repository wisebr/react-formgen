import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

export interface CheckboxProps extends BaseElementProps<boolean> {
  inputRef?: React.Ref<any>;
  onChange?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value, required, disabled, label, helpTip, onChange, name, inputRef, error, scene
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
        label={<ElementLabel text={label} tip={helpTip} />}
        control={
          <MuiCheckbox inputRef={inputRef} name={name} {...rest} onChange={handleChange} />
        }
      />
    </FormControl>
  );
};

export default React.memo(Checkbox);
