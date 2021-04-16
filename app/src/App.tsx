import { createMuiTheme, StyledEngineProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { theme as formgenTheme } from 'react-formgen';

import Main from './Main';

const theme = {
  ...createMuiTheme({
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
