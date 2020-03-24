import { CheckboxElementData, DateTimePickerElementData, ElementData, ElementType, SelectElementData } from './types';

export const isSelectElement = (el: ElementData): el is SelectElementData => el.type === ElementType.Select;
export const isCheckboxElement = (el: ElementData): el is CheckboxElementData => el.type === ElementType.Checkbox;
export const isDateTimePickerElement = (el: ElementData): el is DateTimePickerElementData => el.type === ElementType.DateTimePicker;