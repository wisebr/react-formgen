import { Reducer } from 'react';
import shortId from 'shortid';

import { ElementAction, ElementData } from './types';

export const elementsReducer: Reducer<
  ElementData[],
  ElementAction
> = (state, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const element = action.payload.id
        ? { ...action.payload }
        : { ...action.payload, id: shortId() };
      return [...state, element];
    case 'REMOVE_ELEMENT':
      const index = state.findIndex(e => e.id === action.payload);
      if (index >= 0) {
        const newState = [...state];
        newState.splice(index, 1);
        return newState;
      }
      break;
    case 'UPDATE_ELEMENT':
      const idx = state.findIndex(e => e.id === action.payload.id);
      if (idx >= 0) {
        const newState = [...state];
        const newElement = { ...state[idx], ...action.payload }; // shallow copy
        newState.splice(idx, 1, newElement);
        return newState;
      }
      break;
  }
  return state;
};
