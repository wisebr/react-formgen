import { Reducer } from 'react';
import shortId from 'shortid';

import { ElementAction, ElementData } from './types';

const createElement = (el: ElementData) => el.id
? { ...el }
: { ...el, id: shortId() };

export const elementsReducer: Reducer<
  ElementData[],
  ElementAction
> = (state, {type, payload}) => {
  switch (type) {
    case 'FORMGEN/ADD_ELEMENT':
      return [...state, createElement(payload)];
    case 'FORMGEN/REMOVE_ELEMENT':
      const index = state.findIndex(e => e.id === payload);
      if (index >= 0) {
        const newState = [...state];
        newState.splice(index, 1);
        return newState;
      }
      break;
    case 'FORMGEN/UPDATE_ELEMENT':
      console.log('formgen update element:', payload);
      const idx = state.findIndex(e => e.id === payload.id);
      if (idx >= 0) {
        const newState = [...state];
        const newElement = { ...state[idx], ...payload }; // shallow copy
        newState.splice(idx, 1, newElement);
        return newState;
      }
      break;
    case 'FORMGEN/REMOVE_ALL_ELEMENTS':
      return [];
    case 'FORMGEN/ADD_ELEMENTS':
      if (payload && payload.length) {
        return [...state, ...payload.map((el: ElementData) => createElement(el))];
      }
  }
  return state;
};
