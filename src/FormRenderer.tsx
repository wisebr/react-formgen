import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { FormContextValues } from 'react-hook-form';

import ElementSwitch from './ElementSwitch';
import { ElementData } from './types';

export interface FormRendererProps extends FormContextValues {
  className?: string;
  elements: ElementData[];
}

const useStyles = makeStyles(() => ({
  field: {
    marginBottom: 10,
    '&:last-of-type': {
      marginBottom: 30,
    }
  }
}));

const FormRenderer: React.FC<FormRendererProps> = ({ className, elements, register, setValue }) => {
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
    </div>
  );
};

export default React.memo(FormRenderer);
