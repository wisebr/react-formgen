import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ICON_MAP } from './constants';
import { BASE_ELEMENT_MAP } from './elements';
import FormgenContext from './FormgenContext';
import enUs from './locales/en_US.json';
import { BASE_SETTING_MAP } from './settings';
import { ElementComponentMap, ObjectMap, SettingComponentMap } from './types';

export interface FormgenProviderProps {
  locales?: ObjectMap;
  adapterLocaleIsZh?: boolean;
  adapterLocale?: ObjectMap;
  iconMap?: {[key: string]: React.ElementType};
  elementMap?: ElementComponentMap;
  settingMap?: SettingComponentMap;
}

const FormgenProvider: React.FC<FormgenProviderProps> = ({
  children,
  locales,
  adapterLocale = {},
  iconMap = ICON_MAP,
  elementMap = BASE_ELEMENT_MAP,
  settingMap = BASE_SETTING_MAP,
}) => {
  const mergedLocales: ObjectMap = React.useMemo(() => locales ? {...enUs, ...locales} : enUs, [locales]);
  const getLocale = useCallback((key: string) => {
    const locale = mergedLocales[key];
    if (!locale) {
      console.warn(`[formgen] doesn't match the key "${key}" in locales`);
      return key;
    }
    return locale;
  }, [mergedLocales]);
  return (
    <DndProvider backend={HTML5Backend}>
      <FormgenContext.Provider
        value={{
          adapterLocale,
          locales: mergedLocales,
          getLocale,
          iconMap,
          elementMap,
          settingMap,
        }}
      >
        {children}
      </FormgenContext.Provider>
    </DndProvider>
  );
};

export default FormgenProvider;