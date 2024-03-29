import { useCallback, useMemo, useState } from 'react';
import * as React from 'react';

import { elementsReducer } from './reducer';
import { ElementData } from './types';

export default function useElementsState (preloadedElements: ElementData[] = []) {
  const [elements, dispatchElement] = React.useReducer(elementsReducer, preloadedElements);
  const [activedId, setActivedId] = useState<string>();
  const activedElement = useMemo(
    () => {
      if (activedId) {
        return elements.find((el) => el.id === activedId);
      }
      return;
    },
    [elements, activedId],
  );

  const addElement = useCallback(
    (element: ElementData) =>
      dispatchElement({ type: 'FORMGEN/ADD_ELEMENT', payload: element }),
    [],
  );

  const removeElement = useCallback(
    (id: string) => dispatchElement({ type: 'FORMGEN/REMOVE_ELEMENT', payload: id }),
    [],
  );

  const updateElement = useCallback(
    (payload: Partial<ElementData>) =>
      dispatchElement({ type: 'FORMGEN/UPDATE_ELEMENT', payload }),
    [],
  );

  const removeAllElements = useCallback(
    () => dispatchElement({ type: 'FORMGEN/REMOVE_ALL_ELEMENTS' }),
    [],
  );

  const addElements = useCallback(
    (elementList: ElementData[]) => dispatchElement({ type: 'FORMGEN/ADD_ELEMENTS', payload: elementList }),
    [],
  );

  const moveElement = useCallback(
    (index: number, target: number) => dispatchElement({ type: 'FORMGEN/MOVE_ELEMENT', payload: {index, target} }),
    [],
  );

  const activeElement = useCallback((id: string) => {
    if (id !== activedId) {
      setActivedId(id);
    }
  }, []);

  const deactiveElement = useCallback(() => {
    setActivedId('');
  }, []);

  return {
    elements, addElement, removeElement, updateElement, removeAllElements, addElements, moveElement,
    activedElement, activeElement, deactiveElement
  };
}

export type FormgenElementsState = ReturnType<typeof useElementsState>;
