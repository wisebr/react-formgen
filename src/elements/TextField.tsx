import { TextField as MuiTextField } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';

export interface TextFieldProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  value, required, disabled, label, onChange, name, inputRef, error, scene
}) => {
  const commonClasses = useCommonStyles();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(ev.target.value);
    }
  };

  const rest = scene === 'renderer' ? {defaultValue: value} : {value};

  return (
    <MuiTextField
      inputRef={inputRef}
      className={commonClasses.element}
      label={label}
      name={name}
      {...rest}
      required={required}
      disabled={disabled}
      onChange={handleChange}
      error={!!error}
    />
  );
};

export default React.memo(TextField);
