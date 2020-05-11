import { Reducer } from 'react';
import shortId from 'shortid';

import { BaseAction, ElementData } from './types';

const createElement = (el: ElementData, order: number) => el.id
? { ...el, order }
: { ...el, id: shortId(), order };

const insertElement = (state: ElementData[], element: ElementData, index: number) => {
  const newState: ElementData[] = [];
  if (state.length === 0) {
    return [createElement(element, 0)];
  }

  if (index === state.length) {
    return [...state, createElement(element, index)];
  }

  state.forEach((el, i) => {
    if (i === index) {
      newState.push(createElement(element, index));
    }
    if (i >= index) {
      newState.push({...el, order: ++i});
    } else {
      newState.push(el);
    }
  });
  return newState;
};

const removeElement = (state: ElementData[], id: string) => {
  const index = state.findIndex((e) => e.id === id);
  if (index >= 0) {
    const newState: ElementData[] = [];
    state.forEach((el, i) => {
      if (i < index) {
        newState.push(el);
      } else if (i > index) {
        newState.push({...el, order: --i});
      }
    });
    return newState;
  }
  return state;
};

const updateElement = (state: ElementData[], element: Partial<ElementData>) => {
  if (!element.id) {
    console.error('formgen reducer: should specify the id when update element', element);
  }
  const idx = state.findIndex((e) => e.id === element.id);
  if (idx >= 0) {
    const newState = [...state];
    const newElement = { ...state[idx], ...element }; // shallow copy
    newState.splice(idx, 1, newElement);
    return newState;
  }
  return state;
};

const moveElement = (state: ElementData[], index: number, target: number) => {
  const newState: ElementData[] = [];
  if (index === target) {
    console.warn(`formgen reducer: move element between same index, from ${index} to ${target}`);
    return state;
  } else {
    if (index < target) {
      state.forEach((el, i) => {
        if (i === index) {
          return;
        }
        newState.push(el);
        if (i === target) {
          newState.push(state[index]);
        }
      });
    } else {
      state.forEach((el, i) => {
        if (i === index) {
          return;
        }
        if (i === target) {
          newState.push(state[index]);
        }
        newState.push(el);
      });
    }
  }
  return newState.map((el, i) => ({...el, order: i}));
};

export const elementsReducer: Reducer<
  ElementData[],
  BaseAction
> = (state = [], {type, payload, index = state.length}) => {
  switch (type) {
    case 'FORMGEN/ADD_ELEMENT':
      return insertElement(state, payload, index);
    case 'FORMGEN/ADD_ELEMENTS':
      // TODO: insert to specified index
      if (payload && payload.length) {
        return [...state, ...payload.map((el: ElementData, i: number) => createElement(el, state.length + i))];
      }
      break;
    case 'FORMGEN/REMOVE_ELEMENT':
      return removeElement(state, payload);
    case 'FORMGEN/REMOVE_ALL_ELEMENTS':
      return [];
    case 'FORMGEN/UPDATE_ELEMENT':
      return updateElement(state, payload);
    case 'FORMGEN/MOVE_ELEMENT':
      return moveElement(state, payload.index, payload.target);
    default:
      break;
  }
  return state;
};
