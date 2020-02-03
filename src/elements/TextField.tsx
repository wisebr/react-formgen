import { TextField as MuiTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { ElementData } from '../types';

const useStyles = makeStyles({
  root: {
    marginRight: 10
  },
});

export interface TextFieldProps {
  data: ElementData;
  onChange?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({ data, onChange }) => {
  const classes = useStyles();

  return (
    <MuiTextField
      className={classes.root}
      label={data.locales.title}
      value={data.value}
      required={data.required}
      onChange={onChange}
    />
  );
};

export default TextField;
