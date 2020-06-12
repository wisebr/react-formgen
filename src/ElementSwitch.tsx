import React, { useMemo } from 'react';

import FormgenContext from './FormgenContext';
import { BaseElementProps, ElementData, ElementError, ElementSceneType } from './types';

export interface ElementSwitchProps extends Partial<ElementData> {
  type: ElementData['type'];
  scene: ElementSceneType;
  inputRef?: React.Ref<any>;
  onChange?: (...args: any[]) => void;
  error?: ElementError;
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
}) => {
  const {elementMap} = React.useContext(FormgenContext);
  const Component: React.ComponentType<any> = useMemo(
    () => elementMap[type],
    [type],
  );
  if (!Component) {
    console.error(
      `there is no element component named ${type}, please add one via context prop "elementMap" first`,
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
    value,
  };
  return (
    <Component
      {...props}
      {...rest}
      onChange={onChange}
      inputRef={inputRef}
      key={id}
    />
  );
};

export default React.memo(ElementSwitch);
