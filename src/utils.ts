import { ElementData, ElementType, SelectElementData } from './types';

export const isSelectElement = (el: ElementData): el is SelectElementData => el.type === ElementType.Select;