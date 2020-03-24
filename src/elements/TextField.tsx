import { TextField as MuiTextField } from '@material-ui/core';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

export interface TextFieldProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ value, required, disabled, label, helpTip, onChange, name, inputRef }) => {
  const commonClasses = useCommonStyles();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(ev.target.value);
    }
  };

  return (
    <MuiTextField
      inputRef={inputRef}
      className={commonClasses.element}
      label={<ElementLabel text={label} tip={helpTip} />}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default React.memo(TextField);
