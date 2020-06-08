import { FieldError, NestDataObject } from 'react-hook-form';

export interface ObjectMap<T = any> {
  [key: string]: T;
}

export type ElementSceneType = 'previewer' | 'renderer';

export enum ElementType {
  TextField = 'TextField',
  NumberField = 'NumberField',
  Select = 'Select',
  Switch = 'Switch', // TODO
  Checkbox = 'Checkbox',
  Radio = 'Radio', // TODO
  Textarea = 'Textarea', // TODO
  DateTimePicker = 'DateTimePicker',
}

export interface SettingsOptions {
  label?: boolean;
  name?: boolean;
  value?: boolean;
  required?: boolean;
  disabled?: boolean;
  helpTip?: boolean;
  options?: boolean;
}

export interface ElementOptions<P extends ObjectMap = {}, V = any> {
  name?: string; // unique
  label?: string;
  value?: V; // default value
  type: string; // form component name
  required?: boolean;
  disabled?: boolean;
  helpTip?: string;
  props?: P;
  elements?: ElementOptions[]; // if there are sub elements
  settings?: SettingsOptions;
}

export interface LibItemData {
  id: string; // unique
  name?: string; // unique, extends ElementType
  thumb?: React.ReactNode;
  element: ElementOptions;
}

export interface LibraryDragItem {
  type: string;
  id: string; // LibItemData.id
  element: ElementOptions;
}

export interface LibraryData {
  name: string;
  items: LibItemData[];
}

// The type stored in context
export interface ElementData<P extends ObjectMap = {}, V = any> {
  id: string; // unique
  name: string; // unique
  label: string;
  value: V; // default value
  type: string; // LibItemData.name, ElementType
  order: number; // span 10
  required: boolean;
  disabled: boolean;
  helpTip: string;
  props: P;
  settings: SettingsOptions;
}

// For component to extend
export interface BaseElementProps<V = any> {
  name: string;
  label: string;
  value: V;
  type: string;
  required: boolean;
  disabled: boolean;
  helpTip: string;
  settings: SettingsOptions;
  error?: ElementError; // from react-hook-form
  scene: ElementSceneType;
  setValue?: (name: string, val: any) => void;
}

export type ElementMap = ObjectMap<ElementOptions>;

export interface BaseAction {
  type: string;
  payload?: any;
  [key: string]: any;
}

export interface BaseSettingProps {
  className?: string;
  data: ElementData;
  update: (data: Partial<ElementData>) => void;
}

// External props from context
export interface SelectElementProps {
  options: SelectOption[];
}

export interface SelectOption {
  id: string;
  label: string;
  value: string;
}

export type NumberFieldElementData = ElementData<{}, string>;
export type NumberFieldElementOptions = ElementOptions<{}, string>;

export type SelectElementData = ElementData<SelectElementProps, string>;
export type SelectElementOptions = ElementOptions<SelectElementProps, string>;

export type CheckboxElementData = ElementData<{}, boolean>;
export type CheckboxElementOptions = ElementOptions<{}, boolean>;

export type DateTimePickerElementData = ElementData<{}, string>;
export type DateTimePickerElementOptions = ElementOptions<{}, string>;

export type ElementError = FieldError | FieldError[] | NestDataObject<any> | NestDataObject<any>[];

export type ElementComponentMap<T extends BaseElementProps = any> = ObjectMap<React.ComponentType<T>>;
