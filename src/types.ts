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

export interface ElementOptions<P extends ObjectMap = {}, V = any, Meta = {}> {
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
  meta?: Meta;
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
export interface ElementData<P extends ObjectMap = {}, V = any, Meta = {}> {
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
  meta?: Meta;
}

// For component to extend
export interface BaseElementProps<V = any, Ctx = any> {
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
  context?: Ctx;
}

export type ElementMap = ObjectMap<ElementOptions>;

export interface BaseAction {
  type: string;
  payload?: any;
  [key: string]: any;
}

export interface BaseSettingProps<T extends ElementData = ElementData> {
  data: T;
  onUpdateElement?: (payload: Partial<T>) => void;
}

export interface BaseSettingOptionProps<T extends ElementData = any> {
  className?: string;
  data: T;
  update: (data: Partial<T>) => void;
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

export type ElementError = FieldError | FieldError[] | NestDataObject<any, any> | NestDataObject<any, any>[];

export type ElementComponentMap<T extends BaseElementProps = any> = ObjectMap<React.ComponentType<T>>;
export type SettingComponentMap<T extends BaseSettingProps = any> = ObjectMap<React.ComponentType<T>>;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};