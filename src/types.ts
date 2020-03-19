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
}

export interface ElementOptions<P extends ObjectMap = ObjectMap> {
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
export interface ElementData<P extends ObjectMap = ObjectMap, S extends SettingsOptions = SettingsOptions> {
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
  settings: S;
}

// For component to extend
export interface BaseElementProps<V = any, S extends SettingsOptions = SettingsOptions> {
  name: string;
  label: string;
  value: V;
  type: string;
  required: boolean;
  disabled: boolean;
  helpTip: string;
  settings: S;
}

export type ElementMap = ObjectMap<ElementOptions>;

export interface ElementAction {
  type: string;
  payload?: any;
  [key: string]: any;
}

export interface BaseSettingProps {
  className?: string;
  data: ElementData;
  update: (data: Partial<ElementData>) => void;
}
