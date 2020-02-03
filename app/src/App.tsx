import { CssBaseline } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import FormGenerator from './FormGenerator';

const useStyles = makeStyles({
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%'
    },
    '#root': {
      height: '100%'
    }
  },
  root: {
    height: '100%',
    backgroundColor: grey[200]
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <FormGenerator />
    </div>
  );
}

export default App;
