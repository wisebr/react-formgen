import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';

import { useCommonStyles } from '../styles';
import { BaseElementProps } from '../types';
import ElementLabel from './ElementLabel';

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
  helpTip,
  onChange,
  name,
  inputRef,
  error,
  setValue,
}) => {
  const commonClasses = useCommonStyles();
  const [renderVal, setRenderVal] = useState(new Date());

  const handleChange = (date: Date) => {
    setRenderVal(date);
    if (onChange) {
      onChange(date.getTime());
    }
  };

  if (scene === 'renderer' && setValue) {
    useEffect(() => {
      setValue(name, renderVal.getTime());
    }, []);
  }

  return (
    <>
      <KeyboardDateTimePicker
        className={commonClasses.element}
        label={<ElementLabel text={label} tip={helpTip} />}
        value={scene === 'previewer' ? new Date() : renderVal}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        format="yyyy-MM-dd HH:mm:ss"
        error={!!error}
      />
      <input type="hidden" ref={inputRef} name={name} />
    </>
  );
};

export default React.memo(DateTimePicker);
