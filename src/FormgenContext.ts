import React from 'react';

import { BASE_ELEMENT_MAP, ICON_MAP } from './constants';
import enUs from './locales/en_US.json';
import { ObjectMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  getLocale: (key: string) => string;
  iconMap: {[key: string]: React.ElementType};
  elementMap: {[type: string]: React.ComponentType};
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  getLocale: () => '',
  iconMap: ICON_MAP,
  elementMap: BASE_ELEMENT_MAP,
});

export default FormgenContext;
