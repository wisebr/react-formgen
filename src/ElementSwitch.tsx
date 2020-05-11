import React, { useMemo } from 'react';

import * as elements from './elements';
import { BaseElementProps, ElementData, ElementError, ElementSceneType } from './types';

export interface ElementSwitchProps extends Partial<ElementData> {
  type: ElementData['type'];
  scene: ElementSceneType;
  inputRef?: React.Ref<any>;
  onChange?: (...args: any[]) => void;
  error?: ElementError;
  setValue?: (name: string, val: any) => void;
}

const ElementSwitch: React.FC<ElementSwitchProps> = ({
  scene,
  id,
  name,
  value,
  type,
  required,
  disabled,
  label,
  helpTip,
  props,
  settings,
  onChange,
  inputRef,
  error,
  setValue,
}) => {
  const Component: React.ComponentType<any> = useMemo(
    () => (elements as any)[type],
    [type],
  );
  if (!Component) {
    console.error(
      `there is no element component named ${type}, please add one first`,
    );
    return null;
  }
  const rest: Partial<BaseElementProps> = {
    scene,
    name,
    type,
    required,
    disabled,
    label,
    helpTip,
    settings,
    error,
  };
  if (scene === 'previewer') {
    rest.value = value;
  }
  return (
    <Component
      {...props}
      {...rest}
      onChange={onChange}
      inputRef={inputRef}
      setValue={setValue}
      key={id}
    />
  );
};

export default React.memo(ElementSwitch);
