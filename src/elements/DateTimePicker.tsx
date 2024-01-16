import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from "dayjs";
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
  const [renderVal, setRenderVal] = useState(dayjs());

  const handleChange = useCallback((date: Dayjs) => {
    setRenderVal(date);
    if (onChange) {
      onChange(date ? date.valueOf() : 0);
    }
  }, [onChange]);

  useEffect(() => {
    if (scene === 'renderer' && onChange) {
      onChange(renderVal ? renderVal.valueOf() : 0);
    }
  }, []);

  return (
    <>
      <MuiDateTimePicker
        className={commonClasses.element}
        label={label}
        value={scene === 'previewer' ? dayjs() : renderVal}
        slotProps={{ textField: { required: required, margin: 'normal', error: !!error } }}
        disabled={disabled}
        onChange={handleChange as any}
        format="YYYY-MM-DD HH:mm:ss"
      />
      <input type="hidden" ref={inputRef} name={name} />
    </>
  );
};

export default React.memo(DateTimePicker);
