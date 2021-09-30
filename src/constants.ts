import CheckBox from '@mui/icons-material/CheckBox';
import Input from '@mui/icons-material/Input';
import ListAlt from '@mui/icons-material/ListAlt';
import LooksOne from '@mui/icons-material/LooksOne';
import Today from '@mui/icons-material/Today';

import { ElementOptions, ElementType, LibItemData, LibraryData, SelectElementOptions } from './types';

// tslint:disable: variable-name
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
    element: ELEMENT_TextField
  }, {
    id: ElementType.NumberField,
    element: ELEMENT_NumberField
  }, {
    id: ElementType.Checkbox,
    element: ELEMENT_Checkbox
  }, {
    id: ElementType.Select,
    element: ELEMENT_Select
  }, {
    id: ElementType.DateTimePicker,
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