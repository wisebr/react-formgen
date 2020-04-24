import React from 'react';

import { ICON_MAP } from './constants';
import enUs from './locales/en_US.json';
import { ObjectMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  getLocale: (key: string) => string;
  iconMap: {[key: string]: React.ElementType};
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  getLocale: () => '',
  iconMap: ICON_MAP,
});

export default FormgenContext;
