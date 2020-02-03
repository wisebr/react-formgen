import { Grid } from '@material-ui/core';
import React, { useReducer } from 'react';
import {
  BASE_ELEMENT_MAP,
  BaseLibrary,
  ElementMap,
  elementsReducer,
  ElementType,
  FormgenProvider,
  LibContainer,
  LibItemData,
  Library,
  Previewer,
} from 'react-formgen';

const customLibItems: LibItemData[] = [{
  name: 'group1',
  thumb: ''
}];

const elementMap: ElementMap = {
  ...BASE_ELEMENT_MAP,
  group1: {
    type: 'group1',
    items: [{
      type: ElementType.TextField,
      required: true,
      hidden: false,
      locales: {
        title: 'var one'
      },
      props: {},
      meta: {},
    }, {
      type: ElementType.TextField,
      required: true,
      hidden: false,
      locales: {
        title: 'var two'
      },
      props: {},
      meta: {},
    }]
  }
};

const FormGenerator = () => {
  const [elements, dispatchElement] = useReducer(elementsReducer, []);

  return (
    <FormgenProvider elements={elements} dispatchElement={dispatchElement} elementMap={elementMap}>
      <Grid container>
        <Grid item xs={2}>
          <LibContainer>
            <BaseLibrary />
            <Library name="custom" items={customLibItems} />
          </LibContainer>
        </Grid>
        <Grid item xs={10}>
          <Previewer />
        </Grid>
      </Grid>
    </FormgenProvider>
  );
};

export default FormGenerator;