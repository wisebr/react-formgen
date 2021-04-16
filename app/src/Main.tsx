import { Button, CssBaseline, Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React, { useCallback, useState } from 'react';
import { ElementData, useElementsState } from 'react-formgen';

import FormGenerator from './FormGenerator';
import FormSubmission from './FormSubmission';
import { generateElements } from './utils';

const useStyles = makeStyles<Theme>(({palette}) => ({
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
    backgroundColor: palette.mode === 'dark' ? grey[800] : grey[200],
  },
  title: {
    padding: 15,
  },
  renderBtn: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    top: 15
  }
}));

const Main = () => {
  const classes = useStyles();
  const fgElementsState = useElementsState();
  const [elements, setElements] = useState<ElementData[]>([]);

  const handleRender = useCallback(() => {
    setElements([...fgElementsState.elements]);
  }, [fgElementsState.elements]);

  const handleRandom = useCallback(() => {
    setElements(generateElements());
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography className={classes.title} variant="h5">FormGenerator</Typography>
      <FormGenerator state={fgElementsState} />
      <div className={classes.renderBtn}>
        <Button variant="contained" onClick={handleRender}>↓↓ Render To ↓↓</Button>
        &nbsp;OR&nbsp;
        <Button variant="contained" onClick={handleRandom}>Random Render</Button>
      </div>
      <Divider />
      <Typography className={classes.title} variant="h5">FormRenderer</Typography>
      <FormSubmission elements={elements} />
    </div>
  );
};

export default Main;