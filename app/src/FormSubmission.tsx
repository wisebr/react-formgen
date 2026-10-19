import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { ElementData, FormgenProvider, FormRenderer } from 'react-formgen';
import { Controller, useForm } from 'react-hook-form';

import { ELEMENT_MAP } from './constants';
import locales from './i18n.json';

interface FormSubmissionProps {
  elements: ElementData[];
}

const FormSubmission = ({elements}: FormSubmissionProps) => {
  const formHook = useForm({mode: 'onChange'});
  const [data, setData] = useState<any>();

  // tslint:disable-next-line: no-shadowed-variable
  const onSubmit = formHook.handleSubmit((d) => {
    console.log(d);
    setData(d);
  });

  return (
    <Box sx={{ p: '15px' }}>
      <Grid container>
        <Grid size={{ xs: 6 }}>

          <FormgenProvider
            locales={locales}
            elementMap={ELEMENT_MAP}
          >
            <FormRenderer
              elements={elements}
              {...formHook}
              showTips
            />
          </FormgenProvider>
          <Controller
            name="test"
            control={formHook.control}
            rules={{required: true}}
            defaultValue="5"
            render={({field}) => (
              <TextField
                {...field}
                label="External Input"
              />
            )}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="value"
            fullWidth
            multiline
            variant="outlined"
            value={JSON.stringify(data, undefined, 4)}
            InputLabelProps={{shrink: !!data}}
          />
          <br />
          <br />
          <TextField
            label="errors"
            fullWidth
            multiline
            variant="outlined"
            value={JSON.stringify(formHook.formState.errors, undefined, 4)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormSubmission;
