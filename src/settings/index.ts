import { ElementType, SettingComponentMap } from '../types';
import CheckboxSettings from './CheckboxSettings';
import DateTimePickerSettings from './DateTimePickerSettings';
import NumberFieldSettings from './NumberFieldSettings';
import SelectSettings from './SelectSettings';
import TextFieldSettings from './TextFieldSettings';

export { default as TextFieldSettings } from './TextFieldSettings';
export * from './TextFieldSettings';
export { default as NumberFieldSettings } from './NumberFieldSettings';
export * from './NumberFieldSettings';
export { default as SelectSettings } from './SelectSettings';
export * from './SelectSettings';
export { default as CheckboxSettings } from './CheckboxSettings';
export * from './CheckboxSettings';
export { default as DateTimePickerSettings } from './DateTimePickerSettings';
export * from './DateTimePickerSettings';

export * from './options';

export const BASE_SETTING_MAP: SettingComponentMap = {
  [ElementType.TextField]: TextFieldSettings,
  [ElementType.NumberField]: NumberFieldSettings,
  [ElementType.Checkbox]: CheckboxSettings,
  [ElementType.Select]: SelectSettings,
  [ElementType.DateTimePicker]: DateTimePickerSettings,
};