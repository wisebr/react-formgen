import { Grid } from '@material-ui/core';
import React, { useCallback, useReducer } from 'react';
import {
  BaseLibrary,
  ElementData,
  elementsReducer,
  ElementType,
  FormgenProvider,
  LibContainer,
  LibItemData,
  Library,
  Previewer,
  SettingPanel,
} from 'react-formgen';

const customLibItems: LibItemData[] = [{
  name: 'group1',
  thumb: '',
  element: {
    type: 'group1',
    elements: [{
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
}];

const FormGenerator = () => {
  const [elements, dispatchElement] = useReducer(elementsReducer, []);

  const handleAddElement = useCallback(
    (element: ElementData) => dispatchElement({ type: 'ADD_ELEMENT', payload: element }),
    []
  );

  const handleRemoveElement = useCallback(
    (id: string) => dispatchElement({ type: 'REMOVE_ELEMENT', payload: id }),
    []
  );

  const handleUpdateElement = useCallback(
    (payload: Partial<ElementData>) => dispatchElement({ type: 'UPDATE_ELEMENT', payload }),
    []
  );

  return (
    <FormgenProvider
      elements={elements}
      onAddElement={handleAddElement}
      onRemoveElement={handleRemoveElement}
      onUpdateElement={handleUpdateElement}
    >
      <Grid container>
        <Grid item xs={2}>
          <LibContainer>
            <BaseLibrary dragType="library" />
            <Library dragType="library" name="custom" items={customLibItems} />
          </LibContainer>
        </Grid>
        <Grid item xs={8}>
          <Previewer acceptDropType="library" />
        </Grid>
        <Grid item xs={2}>
          <SettingPanel />
        </Grid>
      </Grid>
    </FormgenProvider>
  );
};

export default FormGenerator;