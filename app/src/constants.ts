import {
  BASE_ELEMENT_MAP,
  BASE_SETTING_MAP,
  KEY_PAIRS_INPUT_LIST,
  KeyPairsInputList,
  KeyPairsInputListSettings,
} from 'react-formgen';

export const ELEMENT_MAP = {
  ...BASE_ELEMENT_MAP,
  [KEY_PAIRS_INPUT_LIST]: KeyPairsInputList,
};

export const SETTINGS_MAP = {
  ...BASE_SETTING_MAP,
  [KEY_PAIRS_INPUT_LIST]: KeyPairsInputListSettings
};