import React, { useCallback, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { BASE_ELEMENT_MAP } from './constants.js';
import enUs from './locales/en_US.json';
import { ElementAction, ElementData, ElementMap, ObjectMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  elementMap: ElementMap;
  elements: ElementData[];
  dispatchElement: (action: ElementAction) => void;
  getLocale: (key: string) => string;
  activedElement?: ElementData;
  activeElement: (id: string) => void;
}

export interface FormgenProviderProps {
  locales?: ObjectMap;
  elementMap?: ElementMap;
  elements?: ElementData[];
  dispatchElement: (action: ElementAction) => void;
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  elementMap: {},
  elements: [],
  dispatchElement: () => undefined,
  getLocale: () => '',
  activeElement: () => undefined,
});

export const FormgenProvider: React.FC<FormgenProviderProps> = ({
  children,
  locales = enUs,
  elementMap = BASE_ELEMENT_MAP,
  elements = [],
  dispatchElement,
}) => {
  const [activedId, setActivedId] = useState<string>();
  const activedElement = useMemo(
    () => elements.find(el => el.id === activedId),
    [elements, activedId],
  );
  const getLocale = useCallback((key: string) => {
    const locale = locales[key];
    if (!locale) {
      console.warn(`[formgen] doesn't match the key "${key}" in locales`);
      return key;
    }
    return locale;
  }, []);
  const activeElement = useCallback((id: string) => {
    if (id !== activedId) {
      setActivedId(id);
    }
  }, []);
  console.log('render formgen context...');
  return (
    <DndProvider backend={HTML5Backend}>
      <FormgenContext.Provider
        value={{
          locales,
          elements,
          elementMap,
          dispatchElement,
          activedElement,
          activeElement,
          getLocale,
        }}
      >
        {children}
      </FormgenContext.Provider>
    </DndProvider>
  );
};

export default FormgenContext;
