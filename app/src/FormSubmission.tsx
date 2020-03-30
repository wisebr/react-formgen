import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import React from 'react';
import { ElementData, FormRenderer } from 'react-formgen';
import { useForm } from 'react-hook-form';

interface FormSubmissionProps {
  elements: ElementData[];
}

const FormSubmission = ({elements}: FormSubmissionProps) => {
  const formHook = useForm({mode: 'onChange'});

  const onSubmit = formHook.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
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