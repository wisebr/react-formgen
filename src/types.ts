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

export interface BaseLocale {
  title: string;
}

export interface ElementLocale extends BaseLocale {
  [key: string]: string;
}

export interface SettingsOptions {
  name?: boolean;
  varKey?: boolean;
  value?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface ElementOptions<P extends ObjectMap = ObjectMap> {
  name?: string; // unique
  value?: any; // default value
  type: string; // form component name
  required?: boolean;
  disabled?: boolean;
  locales?: ElementLocale;
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

export interface ElementData<P extends ObjectMap = ObjectMap, S extends SettingsOptions = SettingsOptions> {
  id: string; // unique
  name: string; // unique
  value: any; // default value
  type: string; // LibItemData.name, ElementType
  order: number; // span 10
  required: boolean;
  disabled: boolean;
  locales: ElementLocale;
  props: P;
  settings: S;
}

export interface BaseElementProps<V = any, S extends SettingsOptions = SettingsOptions> {
  name: string;
  value: V;
  type: string;
  required: boolean;
  disabled: boolean;
  locales: ElementLocale;
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
