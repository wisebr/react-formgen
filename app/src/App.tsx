import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { theme as formgenTheme } from 'react-formgen';

import Main from './Main';

const theme = {
  ...createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: 'small'
        }
      }
    },
  }),
  formgen: formgenTheme
};

const App: React.FC = () => {
  return (
    <ThemeProvider
      theme={theme}
    >
      <StyledEngineProvider injectFirst>
        <Main />
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
