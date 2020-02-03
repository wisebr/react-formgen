import { ElementOptions, ElementType, LibItemData, LibraryData, ObjectMap } from './types';

export const BASE_LIB_ITEMS: LibItemData[] = [
  {
    name: ElementType.TextField,
    thumb: '',
  },
  {
    name: ElementType.Select,
    thumb: '',
  },
];

export const BASE_LIBRARY: LibraryData = {
  name: 'baseElements',
  items: BASE_LIB_ITEMS,
};

export const ELEMENT_TextField: ElementOptions = {
  name: '',
  type: ElementType.TextField,
  value: '',
  required: false,
  hidden: false,
  locales: {
    title: '',
  },
  props: {},
  meta: {},
};

export const ELEMENT_Select: ElementOptions = {
  name: '',
  type: ElementType.Select,
  value: '',
  required: false,
  hidden: false,
  locales: {
    title: '',
  },
  props: {},
  meta: {},
};

export const BASE_ELEMENT_MAP: ObjectMap<ElementOptions> = {
  [ElementType.TextField]: ELEMENT_TextField,
  [ElementType.Select]: ELEMENT_Select,
};

export const DEF_INPUT_SETTING = {};
