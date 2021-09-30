import { MenuItem, TextField as MuiTextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps, SelectElementProps } from '../types';

const useStyles = makeStyles({
  root: {
    minWidth: 166,
  }
}, {name: 'fg-Select'});

export interface SelectProps extends BaseElementProps<string>, SelectElementProps {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const Select: React.FC<SelectProps> = ({
  value, required, disabled, label, onChange, name, inputRef, options, error, scene
}) => {
  const classes = useStyles();
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
      className={classNames(commonClasses.element, classes.root)}
      select
      label={label}
      name={name}
      {...rest}
      required={required}
      disabled={disabled}
      onChange={handleChange}
      error={!!error}
    >
      {options.map((opt) => (
        <MenuItem key={opt.id} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </MuiTextField>
  );
};

export default React.memo(Select);
