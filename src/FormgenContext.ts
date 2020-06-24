import React from 'react';

import { ICON_MAP } from './constants';
import enUs from './locales/en_US.json';
import { ElementComponentMap, ObjectMap, SettingComponentMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  getLocale: (key: string) => string;
  iconMap: {[key: string]: React.ElementType};
  elementMap: ElementComponentMap;
  settingMap: SettingComponentMap;
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  getLocale: () => '',
  iconMap: ICON_MAP,
  elementMap: {},
  settingMap: {},
});

export default FormgenContext;
