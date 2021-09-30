import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useState } from 'react';
import { ElementData, FormgenProvider, FormRenderer } from 'react-formgen';
import { Controller, useForm } from 'react-hook-form';

import { ELEMENT_MAP } from './constants';
import locales from './i18n.json';

interface FormSubmissionProps {
  elements: ElementData[];
}

const useStyles = makeStyles({
  root: {
    padding: 15
  }
});

const FormSubmission = ({elements}: FormSubmissionProps) => {
  const classes = useStyles();
  const formHook = useForm({mode: 'onChange'});
  const [data, setData] = useState<any>();

  // tslint:disable-next-line: no-shadowed-variable
  const onSubmit = formHook.handleSubmit((d) => {
    console.log(d);
    setData(d);
  });

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>

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
            control={formHook.control}
            as={TextField}
            onChange={([ev]) => ev.target.value}
            name="test"
            label="External Input"
            defaultValue="5"
            rules={{required: true}}
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
        <Grid item xs={6}>
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
            value={JSON.stringify(formHook.errors, undefined, 4)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FormSubmission;