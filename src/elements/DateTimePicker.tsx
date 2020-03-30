import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

export interface DateTimePickerProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, required, disabled, label, helpTip, onChange, name, inputRef, error }) => {
  const commonClasses = useCommonStyles();

  const handleChange = (date: Date) => {
    if (onChange) {
      onChange(date?.toISOString());
    }
  };

  return (
    <>
      <KeyboardDateTimePicker
        className={commonClasses.element}
        label={<ElementLabel text={label} tip={helpTip} />}
        value={new Date(value)}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        format="yyyy-MM-dd HH:mm:ss"
        error={!!error}
      />
      <input type="hidden" ref={inputRef} name={name} value={value} />
    </>
  );
};

export default React.memo(DateTimePicker);
