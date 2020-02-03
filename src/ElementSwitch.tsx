import React from 'react';

import * as elements from './elements';
import { ElementData } from './types';

export interface ElementSwitchProps {
  data: ElementData;
}

const ElementSwitch: React.FC<ElementSwitchProps> = ({ data }) => {
  const Component: React.ComponentType<any> = (elements as any)[data.type];
  if (!Component) {
    console.error(`there is no element component named ${data.type}, please add one first`);
    return null;
  }
  return <Component data={data} key={data.id} />;
};

export default ElementSwitch;
