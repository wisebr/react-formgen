import { Checkbox, FormControl, FormControlLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useContext } from 'react';

import FormgenContext from '../FormgenContext';
import { ElementData } from '../types';

export interface TextFieldSettingsProps {
  data: ElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const useStyles = makeStyles({
  field: {
    display: 'block',
    marginBottom: 10,
  },
});

const TextFieldSettings: React.FC<TextFieldSettingsProps> = ({
  data,
  onUpdateElement,
}) => {
  const { getLocale } = useContext(FormgenContext);
  const classes = useStyles();
  const updateElement = useCallback((payload: Partial<ElementData>) => {
    if (onUpdateElement) {
      onUpdateElement(payload);
    }
  }, []);
  const handleChangeVarKey = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ id: data.id, name: value });
  };
  const handleChangeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ id: data.id, locales: { title: value } });
  };
  const handleChangeValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ id: data.id, value });
  };
  const handleChangeRequired = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ id: data.id, required: checked });
  };
  const handleChangeHidden = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ id: data.id, hidden: checked });
  };
  return (
    <div>
      <TextField
        className={classes.field}
        label={getLocale('varKey')}
        value={data.name}
        onChange={handleChangeVarKey}
      />
      <TextField
        className={classes.field}
        label={getLocale('name')}
        value={data.locales.title}
        onChange={handleChangeTitle}
      />
      <TextField
        className={classes.field}
        label={getLocale('defaultValue')}
        value={data.value}
        onChange={handleChangeValue}
      />
      <FormControl>
        <FormControlLabel
          label={getLocale('required')}
          control={
            <Checkbox checked={data.required} onChange={handleChangeRequired} />
          }
        />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={getLocale('hidden')}
          control={
            <Checkbox checked={data.hidden} onChange={handleChangeHidden} />
          }
        />
      </FormControl>
    </div>
  );
};

export default TextFieldSettings;
