import { Button, CssBaseline, Divider, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { ElementData, FormRenderer, useElementsState } from 'react-formgen';

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
  const fgElementsState = useElementsState();
  const [elements, setElements] = useState<ElementData[]>([]);

  const handleRender = useCallback(() => {
    setElements([...fgElementsState.elements]);
  }, [fgElementsState.elements]);

  const handleSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography variant="h3">FormGenerator</Typography>
      <FormGenerator state={fgElementsState} />
      <Button onClick={handleRender}>Render To:</Button>
      <Divider />
      <Typography variant="h3">FormRenderer</Typography>
      <FormRenderer
        elements={elements}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
