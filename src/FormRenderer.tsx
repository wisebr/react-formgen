import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import React, { useMemo } from 'react';
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

const FormRenderer: React.FC<FormRendererProps> = ({
  className, elements, control, dateUtils, errors
}) => {
  const classes = useStyles();
  const sortedElements = useMemo(() => elements.sort((a, b) => a.order - b.order), [elements]);

  if (!elements.length) {
    return null;
  }

  return (
    <div className={className}>
      <MuiPickersUtilsProvider utils={dateUtils}>
        {sortedElements.map((el) => {
          return (
            <div className={classes.field} key={el.id}>
              <Controller
                control={control}
                as={ElementSwitch}
                scene="renderer"
                {...el}
                error={errors[el.name]}
                rules={{required: el.required}}
                defaultValue={el.value}
              />
            </div>
          );
        })}
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default React.memo(FormRenderer);
