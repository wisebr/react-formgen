import { TextField as MuiTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { BaseElementProps } from '../types';

const useStyles = makeStyles({
  root: {
    marginRight: 10
  },
});

export interface TextFieldProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ value, required, disabled, label, onChange, name, inputRef }) => {
  const classes = useStyles();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(ev.target.value);
    }
  };

  return (
    <MuiTextField
      inputRef={inputRef}
      className={classes.root}
      label={label}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default React.memo(TextField);
