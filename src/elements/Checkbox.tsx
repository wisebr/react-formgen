import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';

export interface CheckboxProps extends BaseElementProps<boolean> {
  inputRef?: React.Ref<any>;
  onChange?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value, disabled, label, onChange, name, inputRef, error, scene
}) => {
  const commonClasses = useCommonStyles();

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
      className={commonClasses.element}
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
