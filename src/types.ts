export interface ObjectMap<T = any> {
  [key: string]: T;
}

export enum ElementType {
  TextField = 'TextField',
  NumberField = 'NumberField',
  Select = 'Select',
  Switch = 'Switch',
  Checkbox = 'Checkbox',
  Radio = 'Radio',
  Textarea = 'Textarea',
  DateTime = 'DateTime',
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

export interface ElementOptions<P extends ObjectMap = {}> {
  name?: string; // unique
  label?: string;
  value?: any; // default value
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
  name: string; // unique, extends ElementType
  thumb: React.ReactNode;
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
export interface ElementData<P extends ObjectMap = {}> {
  id: string; // unique
  name: string; // unique
  label: string;
  value: any; // default value
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

export type SelectElementData = ElementData<SelectElementProps>;
export type SelectElementOptions = ElementOptions<SelectElementProps>;
