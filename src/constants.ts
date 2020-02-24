import { ElementOptions, ElementType, LibItemData, LibraryData } from './types';

export const ELEMENT_TextField: ElementOptions = {
  type: ElementType.TextField,
};

export const ELEMENT_Select: ElementOptions = {
  type: ElementType.Select,
};

export const BASE_LIB_ITEMS: LibItemData[] = [
  {
    id: ElementType.TextField,
    name: ElementType.TextField,
    thumb: '',
    element: ELEMENT_TextField
  },
  {
    id: ElementType.Select,
    name: ElementType.Select,
    thumb: '',
    element: ELEMENT_Select
  },
];

export const BASE_LIBRARY: LibraryData = {
  name: 'baseElements',
  items: BASE_LIB_ITEMS,
};


export const BASE_LIBRARY_TYPE = 'baseLibrary';