import { TextField as MuiTextField } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

export interface NumberFieldProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  value, required, disabled, label, helpTip, onChange, name, inputRef, error, scene
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
      label={<ElementLabel text={label} tip={helpTip} />}
      name={name}
      {...rest}
      type="number"
      required={required}
      disabled={disabled}
      onChange={handleChange}
      error={!!error}
    />
  );
};

export default React.memo(NumberField);
