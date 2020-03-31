import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { ElementData, FormRenderer } from 'react-formgen';
import { useForm } from 'react-hook-form';

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

  const onSubmit = formHook.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className={classes.root}>
      <FormRenderer dateUtils={DateFnsUtils} elements={elements} {...formHook} />
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default FormSubmission;