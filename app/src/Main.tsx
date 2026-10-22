import { Button, CssBaseline, Divider, GlobalStyles, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import React, { useCallback, useState } from 'react';
import { ElementData, useElementsState } from 'react-formgen';

import FormGenerator from './FormGenerator';
import FormSubmission from './FormSubmission';
import { generateElements } from './utils';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? grey[800] : grey[200],
}));

const Title = styled(Typography)({
  padding: 15,
});

const RenderBtn = styled('div')({
  position: 'relative',
  width: '100%',
  textAlign: 'center',
  top: 15
});

const Main = () => {
  const fgElementsState = useElementsState();
  const [elements, setElements] = useState<ElementData[]>([]);
  const [renderKey, setRenderKey] = useState(0);

  const handleRender = useCallback(() => {
    setElements([...fgElementsState.elements]);
    setRenderKey((key) => key + 1);
  }, [fgElementsState.elements]);

  const handleRandom = useCallback(() => {
    setElements(generateElements());
    setRenderKey((key) => key + 1);
  }, []);
  return (
    <Root>
      <CssBaseline />
      <GlobalStyles styles={{
        html: { height: '100%' },
        body: { height: '100%' },
        '#root': { height: '100%' },
      }} />
      <Title variant="h5">FormGenerator</Title>
      <FormGenerator state={fgElementsState} />
      <RenderBtn>
        <Button variant="contained" onClick={handleRender}>↓↓ Render To ↓↓</Button>
        &nbsp;OR&nbsp;
        <Button variant="contained" onClick={handleRandom}>Random Render</Button>
      </RenderBtn>
      <Divider />
      <Title variant="h5">FormRenderer</Title>
      <FormSubmission key={renderKey} elements={elements} />
    </Root>
  );
};

export default Main;
