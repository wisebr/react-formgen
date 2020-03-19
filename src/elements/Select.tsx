import { TextField as MuiTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

const useStyles = makeStyles({
  root: {
    marginRight: 10
  }
}, {name: 'fg-Select'});

export interface SelectProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const Select: React.FC<SelectProps> = ({ value, required, disabled, label, helpTip, onChange, name, inputRef }) => {
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
      select
      label={<ElementLabel text={label} tip={helpTip} />}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default React.memo(Select);
