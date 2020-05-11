import CheckBox from '@material-ui/icons/CheckBox';
import Input from '@material-ui/icons/Input';
import ListAlt from '@material-ui/icons/ListAlt';
import LooksOne from '@material-ui/icons/LooksOne';
import Today from '@material-ui/icons/Today';

import { ElementOptions, ElementType, LibItemData, LibraryData, SelectElementOptions } from './types';

// tslint:disable:variable-name
export const BASE_ELEMENT_SET: ReadonlySet<string> = new Set(Object.keys(ElementType));

export const ELEMENT_TextField: ElementOptions<{}, string> = {
  type: ElementType.TextField,
};

export const ELEMENT_NumberField: ElementOptions<{}, string> = {
  type: ElementType.NumberField,
};

export const ELEMENT_Checkbox: ElementOptions<{}, boolean> = {
  type: ElementType.Checkbox,
  value: false,
};

export const ELEMENT_Select: SelectElementOptions = {
  type: ElementType.Select,
  props: {
    options: []
  },
};

export const ELEMENT_DateTimePicker: ElementOptions<{}, number> = {
  type: ElementType.DateTimePicker,
  settings: {
    value: false, // The default of DateTimePicker value is set to now when render it
  }
};

export const BASE_LIB_ITEMS: LibItemData[] = [
  {
    id: ElementType.TextField,
    name: ElementType.TextField,
    thumb: '',
    element: ELEMENT_TextField
  }, {
    id: ElementType.NumberField,
    name: ElementType.NumberField,
    thumb: '',
    element: ELEMENT_NumberField
  }, {
    id: ElementType.Checkbox,
    name: ElementType.Checkbox,
    thumb: '',
    element: ELEMENT_Checkbox
  }, {
    id: ElementType.Select,
    name: ElementType.Select,
    thumb: '',
    element: ELEMENT_Select
  }, {
    id: ElementType.DateTimePicker,
    name: ElementType.DateTimePicker,
    thumb: '',
    element: ELEMENT_DateTimePicker
  },
];

export const BASE_LIBRARY: LibraryData = {
  name: 'baseElements',
  items: BASE_LIB_ITEMS,
};

export const BASE_LIBRARY_TYPE = 'baseLibrary';

export const ICON_MAP = {
  [ElementType.TextField]: Input,
  [ElementType.NumberField]: LooksOne,
  [ElementType.Checkbox]: CheckBox,
  [ElementType.Select]: ListAlt,
  [ElementType.DateTimePicker]: Today,
};