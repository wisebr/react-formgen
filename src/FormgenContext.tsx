import React, { useCallback, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import enUs from './locales/en_US.json';
import { ElementData, ObjectMap } from './types';

export interface FormgenContextProps {
  locales: ObjectMap;
  elements: ElementData[];
  getLocale: (key: string) => string;
  activedElement?: ElementData;
  activeElement: (id: string) => void;
  onAddElement: (element: ElementData) => void;
  onUpdateElement: (payload: Partial<ElementData>) => void;
  onRemoveElement: (id: string) => void;
}

export interface FormgenProviderProps {
  locales?: ObjectMap;
  elements?: ElementData[];
  onAddElement?: (element: ElementData) => void;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
  onRemoveElement?: (id: string) => void;
}

const FormgenContext = React.createContext<FormgenContextProps>({
  locales: enUs,
  elements: [],
  getLocale: () => '',
  activeElement: () => undefined,
  onAddElement: () => undefined,
  onUpdateElement: () => undefined,
  onRemoveElement: () => undefined,
});

export const FormgenProvider: React.FC<FormgenProviderProps> = ({
  children,
  locales = enUs,
  elements = [],
  onAddElement = () => undefined,
  onUpdateElement = () => undefined,
  onRemoveElement= () => undefined,
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
          onAddElement,
          onUpdateElement,
          onRemoveElement,
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
