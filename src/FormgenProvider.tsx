import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { BASE_ELEMENT_MAP, ICON_MAP } from './constants';
import FormgenContext from './FormgenContext';
import enUs from './locales/en_US.json';
import { ElementComponentMap, ObjectMap } from './types';

export interface FormgenProviderProps {
  locales?: ObjectMap;
  iconMap?: {[key: string]: React.ElementType};
  elementMap?: ElementComponentMap;
}

const FormgenProvider: React.FC<FormgenProviderProps> = ({
  children,
  locales = enUs,
  iconMap = ICON_MAP,
  elementMap = BASE_ELEMENT_MAP,
}) => {
  const getLocale = useCallback((key: string) => {
    const locale = locales[key];
    if (!locale) {
      console.warn(`[formgen] doesn't match the key "${key}" in locales`);
      return key;
    }
    return locale;
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <FormgenContext.Provider
        value={{
          locales,
          getLocale,
          iconMap,
          elementMap,
        }}
      >
        {children}
      </FormgenContext.Provider>
    </DndProvider>
  );
};

export default FormgenProvider;