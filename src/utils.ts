import { CheckboxElementData, ElementData, ElementType, SelectElementData } from './types';

export const isSelectElement = (el: ElementData): el is SelectElementData => el.type === ElementType.Select;
export const isCheckboxElement = (el: ElementData): el is CheckboxElementData => el.type === ElementType.Checkbox;