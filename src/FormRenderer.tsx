import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import ElementSwitch from './ElementSwitch';
import { ElementData } from './types';

export interface FormRendererProps {
  className?: string;
  elements: ElementData[];
  onSubmit?: (data: any) => void;
}

const useStyles = makeStyles(() => ({
  field: {
    marginBottom: 10,
    '&:last-of-type': {
      marginBottom: 30,
    }
  }
}));

const FormRenderer: React.FC<FormRendererProps> = ({ className, elements, onSubmit }) => {
  if (!elements.length) {
    return null;
  }
  const classes = useStyles();
  const {register, handleSubmit} = useForm({
    defaultValues: elements.reduce((data, el) => ({...data, [el.name]: el.value}), {})
  });

  const handleClickSubmit = useCallback(handleSubmit((data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  }), []);

  return (
    <div className={className}>
      {elements.map((el) => {
        const {value, ...rest} = el;
        return (
          <div className={classes.field} key={el.id}>
            <ElementSwitch
              {...rest}
              inputRef={register}
            />
          </div>
        );
      })}
      <Button variant="contained" color="primary" onClick={handleClickSubmit}>Submit</Button>
    </div>
  );
};

export default React.memo(FormRenderer);
