import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import React from 'react';
import {
  BaseLibrary,
  ElementType,
  FormgenElementsState,
  FormgenProvider,
  LibContainer,
  LibItemData,
  Library,
  Previewer,
  SettingPanel,
} from 'react-formgen';

import locales from './i18n.json';

const customLibItems: LibItemData[] = [
  {
    id: 'abc',
    name: 'group1',
    thumb: '',
    element: {
      type: 'group1',
      elements: [
        {
          type: ElementType.TextField,
          required: true,
          disabled: false,
          label: 'var one',
          props: {},
        },
        {
          type: ElementType.TextField,
          required: true,
          disabled: false,
          label: 'var two',
          props: {},
        },
      ],
    },
  },
];

interface FormGeneratorProps {
  state: FormgenElementsState;
}

const FormGenerator = ({state}: FormGeneratorProps) => {
  const {
    elements,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    activedElement,
    activeElement,
  } = state;

  return (
    <FormgenProvider locales={locales}>
      <Grid container>
        <Grid item xs={2}>
          <LibContainer>
            <BaseLibrary dragType="library" />
            <Library dragType="library" name="custom" items={customLibItems} />
          </LibContainer>
        </Grid>
        <Grid item xs={6}>
          <Previewer
            dateUtils={DateFnsUtils}
            elements={elements}
            onAddElement={addElement}
            onRemoveElement={removeElement}
            onMoveElement={moveElement}
            onActiveElement={activeElement}
            activedElement={activedElement}
            acceptDropType="library"
          />
        </Grid>
        <Grid item xs={4}>
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
