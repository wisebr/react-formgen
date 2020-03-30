import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { Controller, FormContextValues } from 'react-hook-form';

import ElementSwitch from './ElementSwitch';
import { ElementData } from './types';

export interface FormRendererProps extends FormContextValues {
  className?: string;
  elements: ElementData[];
  dateUtils: any;
}

const useStyles = makeStyles(() => ({
  field: {
    marginBottom: 10,
    '&:last-of-type': {
      marginBottom: 30,
    }
  }
}));

const FormRenderer: React.FC<FormRendererProps> = ({ className, elements, register, setValue, control, dateUtils, errors }) => {
  if (!elements.length) {
    return null;
  }
  const classes = useStyles();

  useEffect(() => {
    if (elements.length) {
      elements.forEach((el) => setValue(el.name, el.value));
    }
  }, [elements]);

  return (
    <div className={className}>
      <MuiPickersUtilsProvider utils={dateUtils}>
        {elements.map((el) => {
          const {value, ...rest} = el;
          return (
            <div className={classes.field} key={el.id}>
              <Controller
                control={control}
                as={ElementSwitch}
                variant="renderer"
                {...rest}
                error={errors[el.name]}
                defaultValue={value}
                inputRef={register({required: el.required})}
              />
            </div>
          );
        })}
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default React.memo(FormRenderer);
