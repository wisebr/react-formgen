import { LibItemData, ElementData, ElementOptions } from '../../types';
import { KEY_PAIRS_INPUT_LIST, KeyPairsInputListElementProps } from './KeyPairsInputList';

export { default } from './KeyPairsInputList';
export { default as KeyPairsInputList } from './KeyPairsInputList';
export * from './KeyPairsInputList';
export { default as KeyPairsInputListSettings } from './KeyPairsInputListSettings';
export * from './KeyPairsInputListSettings';

export * from './KeyPairInput';

export type KeyPairsInputListElementData = ElementData<KeyPairsInputListElementProps, string>;
export type KeyPairsInputListElementOptions = ElementOptions<KeyPairsInputListElementProps, string>;

export const KEY_PAIRS_INPUT_LIST_LIB_ITEM: LibItemData = {
  id: KEY_PAIRS_INPUT_LIST,
  element: {
    type: KEY_PAIRS_INPUT_LIST,
    props: {
      keys: [],
      inputPropsMap: {}
    },
  } as KeyPairsInputListElementOptions
};
