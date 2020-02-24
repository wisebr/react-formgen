import { Grid } from '@material-ui/core';
import React from 'react';
import {
  BaseLibrary,
  ElementType,
  FormgenProvider,
  LibContainer,
  LibItemData,
  Library,
  Previewer,
  SettingPanel,
  useElementsState,
} from 'react-formgen';

const customLibItems: LibItemData[] = [
  {
    name: 'group1',
    thumb: '',
    element: {
      type: 'group1',
      elements: [
        {
          type: ElementType.TextField,
          required: true,
          hidden: false,
          locales: {
            title: 'var one',
          },
          props: {},
          meta: {},
        },
        {
          type: ElementType.TextField,
          required: true,
          hidden: false,
          locales: {
            title: 'var two',
          },
          props: {},
          meta: {},
        },
      ],
    },
  },
];

const FormGenerator = () => {
  const {
    elements,
    addElement,
    updateElement,
    removeElement,
    activedElement,
    activeElement,
  } = useElementsState();

  return (
    <FormgenProvider>
      <Grid container>
        <Grid item xs={2}>
          <LibContainer>
            <BaseLibrary dragType="library" />
            <Library dragType="library" name="custom" items={customLibItems} />
          </LibContainer>
        </Grid>
        <Grid item xs={8}>
          <Previewer
            elements={elements}
            onAddElement={addElement}
            onRemoveElement={removeElement}
            onActiveElement={activeElement}
            acceptDropType="library"
          />
        </Grid>
        <Grid item xs={2}>
          <SettingPanel
            element={activedElement}
            onUpdateElement={updateElement}
          />
        </Grid>
      </Grid>
    </FormgenProvider>
  );
};

export default FormGenerator;
