import { TextField } from '@mui/material';
import MuiDateTimePicker from '@mui/lab/DateTimePicker';
import React, { useCallback, useEffect, useState } from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';

export interface DateTimePickerProps extends BaseElementProps<string> {
  inputRef?: React.Ref<any>;
  onChange?: (val: number) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  scene,
  // value, DateTimePicker has no default value, it will be set to now when rendering
  required,
  disabled,
  label,
  onChange,
  name,
  inputRef,
  error,
}) => {
  const commonClasses = useCommonStyles();
  const [renderVal, setRenderVal] = useState(new Date());

  const handleChange = useCallback((date: Date) => {
    setRenderVal(date);
    if (onChange) {
      onChange(date.getTime());
    }
  }, [onChange]);

  useEffect(() => {
    if (scene === 'renderer' && onChange) {
      onChange(renderVal.getTime());
    }
  }, []);

  return (
    <>
      <MuiDateTimePicker
        className={commonClasses.element}
        label={label}
        value={scene === 'previewer' ? new Date() : renderVal}
        renderInput={(params) => (
          <TextField
            {...params}
            required={required}
            error={!!error}
            margin="normal"
          />
        )}
        disabled={disabled}
        onChange={handleChange as any}
        inputFormat="yyyy-MM-dd HH:mm:ss"
      />
      <input type="hidden" ref={inputRef} name={name} />
    </>
  );
};

export default React.memo(DateTimePicker);
