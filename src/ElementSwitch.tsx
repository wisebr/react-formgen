import React, { useMemo } from 'react';

import * as elements from './elements';
import { ElementData, ElementError } from './types';

export interface ElementSwitchProps extends Partial<ElementData> {
  type: ElementData['type'];
  variant: 'previewer' | 'renderer';
  inputRef?: React.Ref<any>;
  onChange?: (...args: any[]) => void;
  error?: ElementError;
}

const ElementSwitch: React.FC<ElementSwitchProps> = (
  {variant, id, name, value, type, required, disabled, label, helpTip, props, settings, onChange, inputRef, error},
) => {
  const Component: React.ComponentType<any> = useMemo(() => (elements as any)[type], [type]);
  if (!Component) {
    console.error(`there is no element component named ${type}, please add one first`);
    return null;
  }
  const rest: Partial<ElementSwitchProps> = {name, type, required, disabled, label, helpTip, settings, onChange, inputRef, error};
  if (variant === 'previewer') {
    rest.value = value;
  }
  return (
    <Component
      {...props}
      {...rest}
      key={id}
    />
  )
};

export default React.memo(ElementSwitch);
