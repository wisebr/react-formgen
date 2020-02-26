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
  console.log(`TextFieldSettings rendering:`, data);
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
  const handleChangeDisabled = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ id: data.id, disabled: checked });
  };
  return (
    <div>
      {data.settings.varKey === false || <TextField
        className={classes.field}
        label={getLocale('varKey')}
        value={data.name}
        onChange={handleChangeVarKey}
      />}
      {data.settings.name === false || <TextField
        className={classes.field}
        label={getLocale('name')}
        value={data.locales.title}
        onChange={handleChangeTitle}
      />}
      {data.settings.value === false || <TextField
        className={classes.field}
        label={getLocale('defaultValue')}
        value={data.value}
        onChange={handleChangeValue}
      />}
      {data.settings.required === false || <FormControl>
        <FormControlLabel
          label={getLocale('required')}
          control={
            <Checkbox checked={data.required} onChange={handleChangeRequired} />
          }
        />
      </FormControl>}
      {data.settings.disabled === false || <FormControl>
        <FormControlLabel
          label={getLocale('disabled')}
          control={
            <Checkbox checked={data.disabled} onChange={handleChangeDisabled} />
          }
        />
      </FormControl>}
    </div>
  );
};

export default TextFieldSettings;
