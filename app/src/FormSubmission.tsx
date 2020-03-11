import { Button } from '@material-ui/core';
import React from 'react';
import { ElementData, FormRenderer } from 'react-formgen';
import { useForm } from 'react-hook-form';

interface FormSubmissionProps {
  elements: ElementData[];
}

const FormSubmission = ({elements}: FormSubmissionProps) => {
  const formHook = useForm();

  return (
    <div>
      <FormRenderer elements={elements} {...formHook} />
      <Button
        variant="contained"
        color="primary"
        onClick={formHook.handleSubmit((data) => console.log(data))}
      >
        Submit
      </Button>
    </div>
  );
};

export default FormSubmission;