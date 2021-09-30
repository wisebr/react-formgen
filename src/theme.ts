import { Theme } from '@mui/material';
import { blue, green, grey, lightBlue } from '@mui/material/colors';
import { CSSProperties } from '@mui/styles';
import { DeepPartial } from './types';

type Color = CSSProperties['color'];

export interface FormgenTheme {
  palette: {
    background: {
      active: Color;
      dragover: Color;
      selected: Color;
      head: Color;
    };
    border: {
      hover: Color;
      selected: Color;
    };
    text: {
      clickable: Color;
    };
  };
}

export interface InjectFormgenTheme extends Theme {
  formgen: FormgenTheme;
}

export type InjectFormgenThemeOptions = DeepPartial<InjectFormgenTheme>;

export const theme: FormgenTheme = {
  palette: {
    background: {
      active: blue[100],
      dragover: green[100],
      selected: lightBlue[100],
      head: grey[300],
    },
    border: {
      hover: lightBlue[100],
      selected: lightBlue[200],
    },
    text: {
      clickable: lightBlue[600],
    },
  },
};