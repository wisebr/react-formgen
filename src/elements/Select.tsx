import { MenuItem, TextField as MuiTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps, SelectElementProps } from '../types';
import ElementLabel from './ElementLabel';

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
  value, required, disabled, label, helpTip, onChange, name, inputRef, options, error, scene
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
      label={<ElementLabel text={label} tip={helpTip} />}
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
