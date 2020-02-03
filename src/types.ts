export interface ObjectMap<T = any> {
  [key: string]: T;
}

export enum ElementType {
  TextField = 'TextField',
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

export interface LibItemData {
  name: string; // unique, extends ElementType
  thumb: React.ReactNode;
}

export interface LibraryDragItem {
  type: string;
  name: string;
}

export interface LibraryData {
  name: string;
  items: LibItemData[];
}

export interface ElementData<P extends ObjectMap = ObjectMap> {
  id: string; // unique
  name: string; // unique
  value?: any; // default value
  type: ElementType; // LibItem.name
  order: number; // span 10
  required: boolean;
  hidden: boolean;
  groupId?: string;
  locales: ElementLocale;
  props: P;
  meta: ObjectMap;
}

export interface ElementOptions<P extends ObjectMap = ObjectMap> {
  name?: string; // unique
  value?: any; // default value
  type: string; // LibItem.name
  required?: boolean;
  hidden?: boolean;
  locales?: ElementLocale;
  props?: P;
  meta?: ObjectMap;
  items?: ElementOptions[];
}

export type ElementMap = ObjectMap<ElementOptions>;

export interface ElementAction {
  type: string;
  payload: any;
  [key: string]: any;
}
