import React, { useMemo } from 'react';

import * as elements from './elements';
import { ElementData } from './types';

export interface ElementSwitchProps extends Partial<ElementData> {
  type: ElementData['type'];
  inputRef?: React.Ref<any>;
  onChange?: (...args: any[]) => void;
}

const ElementSwitch: React.FC<ElementSwitchProps> = (
  {id, name, value, type, required, disabled, label, helpTip, props, settings, onChange, inputRef},
) => {
  const Component: React.ComponentType<any> = useMemo(() => (elements as any)[type], [type]);
  if (!Component) {
    console.error(`there is no element component named ${type}, please add one first`);
    return null;
  }
  return (
    <Component
      {...props}
      inputRef={inputRef}
      key={id}
      name={name}
      value={value}
      type={type}
      required={required}
      disabled={disabled}
      label={label}
      helpTip={helpTip}
      settings={settings}
      onChange={onChange}
    />
  );
};

export default React.memo(ElementSwitch);
