import { elementsReducer } from './reducer';
import { ElementData, ElementType } from './types';

const createElement = (id: string, order: number = 0) => ({
  id,
  name: 'foo',
  label: 'bar',
  value: '',
  type: ElementType.TextField,
  order,
  required: true,
  disabled: false,
  helpTip: '',
  props: {},
  settings: {},
});

describe('Test reducer', () => {
  it('should add element correctly', () => {
    const state1 = elementsReducer([], {type: 'FORMGEN/ADD_ELEMENT', payload: createElement('a'), index: 0});
    expect(state1).toEqual([
      createElement('a', 0),
    ]);

    const state: ElementData[] = [
      createElement('a', 0),
      createElement('b', 1),
      createElement('c', 2),
    ];
    const state2 = elementsReducer(state, {type: 'FORMGEN/ADD_ELEMENT', payload: createElement('d'), index: 2});
    expect(state2).toEqual([
      createElement('a', 0),
      createElement('b', 1),
      createElement('d', 2),
      createElement('c', 3),
    ]);
    const state3 = elementsReducer(state, {type: 'FORMGEN/ADD_ELEMENT', payload: createElement('d')});
    expect(state3).toEqual([
      createElement('a', 0),
      createElement('b', 1),
      createElement('c', 2),
      createElement('d', 3),
    ]);
  });

  it('should add multiple elements correctly', () => {
    const multiElements1 = [
      createElement('a'),
      createElement('b'),
      createElement('c'),
    ];
    const state1 = elementsReducer([], {type: 'FORMGEN/ADD_ELEMENTS', payload: multiElements1});
    expect(state1).toEqual([
      createElement('a', 0),
      createElement('b', 1),
      createElement('c', 2),
    ]);

    const multiElements2 = [
      createElement('d'),
      createElement('e'),
      createElement('f'),
    ];

    const state2 = elementsReducer(state1, {type: 'FORMGEN/ADD_ELEMENTS', payload: multiElements2});
    expect(state2).toEqual([
      createElement('a', 0),
      createElement('b', 1),
      createElement('c', 2),
      createElement('d', 3),
      createElement('e', 4),
      createElement('f', 5),
    ]);
  });

  it('should remove element correctly', () => {
    const state = elementsReducer([
      createElement('a', 0),
      createElement('b', 1),
      createElement('c', 2),
      createElement('d', 3),
    ], {type: 'FORMGEN/REMOVE_ELEMENT', payload: 'b'});
    expect(state).toEqual([
      createElement('a', 0),
      createElement('c', 1),
      createElement('d', 2),
    ]);
  });

  it('should remove all elements correctly', () => {
    const state = elementsReducer([
      createElement('a'),
      createElement('b'),
    ], {type: 'FORMGEN/REMOVE_ALL_ELEMENTS'});
    expect(state).toEqual([]);
  });

  it('should update element correctly', () => {
    const state = elementsReducer([
      createElement('a'),
      createElement('b'),
    ], {type: 'FORMGEN/UPDATE_ELEMENT', payload: {id: 'a', name: 'baz', props: {a: 'b'}}});
    expect(state).toEqual([
      {...createElement('a'), name: 'baz', props: {a: 'b'}},
      createElement('b'),
    ]);
  });

  it('should move element correctly', () => {
    const state: ElementData[] = [
      createElement('a'),
      createElement('b'),
      createElement('c'),
    ];

    const state1 = elementsReducer(state, {type: 'FORMGEN/MOVE_ELEMENT', payload: {index: 2, target: 1}});
    expect(state1).toEqual([
      createElement('a', 0),
      createElement('c', 1),
      createElement('b', 2),
    ]);

    const state2 = elementsReducer(state, {type: 'FORMGEN/MOVE_ELEMENT', payload: {index: 0, target: 2}});
    expect(state2).toEqual([
      createElement('b', 0),
      createElement('c', 1),
      createElement('a', 2),
    ]);

    const state3 = elementsReducer([
      createElement('a'),
      createElement('b'),
    ], {type: 'FORMGEN/MOVE_ELEMENT', payload: {index: 1, target: 0}});
    expect(state3).toEqual([
      createElement('b', 0),
      createElement('a', 1),
    ]);

    const state4 = elementsReducer([
      createElement('1'),
      createElement('2'),
      createElement('3'),
      createElement('4'),
      createElement('5'),
      createElement('6'),
      createElement('7'),
    ], {type: 'FORMGEN/MOVE_ELEMENT', payload: {index: 5, target: 2}});
    expect(state4).toEqual([
      createElement('1', 0),
      createElement('2', 1),
      createElement('6', 2),
      createElement('3', 3),
      createElement('4', 4),
      createElement('5', 5),
      createElement('7', 6),
    ]);
  });
});