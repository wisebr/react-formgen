import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import enUs from './locales/en_US.json';
import { ObjectMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  getLocale: (key: string) => string;
}

export interface FormgenProviderProps {
  locales?: ObjectMap;
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  getLocale: () => '',
});

export const FormgenProvider: React.FC<FormgenProviderProps> = ({
  children,
  locales = enUs,
}) => {
  const getLocale = useCallback((key: string) => {
    const locale = locales[key];
    if (!locale) {
      console.warn(`[formgen] doesn't match the key "${key}" in locales`);
      return key;
    }
    return locale;
  }, []);
  console.log('render formgen context...');
  return (
    <DndProvider backend={HTML5Backend}>
      <FormgenContext.Provider
        value={{
          locales,
          getLocale,
        }}
      >
        {children}
      </FormgenContext.Provider>
    </DndProvider>
  );
};

export default FormgenContext;
