import { TextField as MuiTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { BaseElementProps } from '../types';

const useStyles = makeStyles({
  root: {
    marginRight: 10
  },
});

export interface NumberFieldProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({ value, required, disabled, locales, onChange, name, inputRef }) => {
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
      label={locales.title}
      name={name}
      value={value}
      type="number"
      required={required}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default React.memo(NumberField);
