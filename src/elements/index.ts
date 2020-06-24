import { ElementComponentMap } from '../types';
import Checkbox from './Checkbox';
import DateTimePicker from './DateTimePicker';
import NumberField from './NumberField';
import Select from './Select';
import TextField from './TextField';

export * from './TextField';
export * from './NumberField';
export * from './Select';
export * from './Checkbox';
export * from './DateTimePicker';

export {
  TextField,
  NumberField,
  Select,
  Checkbox,
  DateTimePicker,
};

export const BASE_ELEMENT_MAP: ElementComponentMap = {
  TextField,
  NumberField,
  Select,
  Checkbox,
  DateTimePicker,
};