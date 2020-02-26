import React from 'react';

import enUs from './locales/en_US.json';
import { ObjectMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  getLocale: (key: string) => string;
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  getLocale: () => '',
});

export default FormgenContext;
