import { MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps, SelectOption } from '../../types';

export interface DefaultValueSettingProps extends BaseSettingProps {
  type?: 'number' | 'text';
  select?: boolean;
  options?: SelectOption[];
  transValueToBool?: boolean;
}

const useStyles = makeStyles({
  control: {
    minWidth: 166,
  }
}, {name: 'fg-DefaultValueSetting'});

const DefaultValueSetting: React.FC<DefaultValueSettingProps> = ({data, className, update, type, select, options, transValueToBool}) => {
  if (data.settings.value === false) {
    return null;
  }
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (transValueToBool) {
      update({ id: data.id, value: value === 'true' });
    } else {
      update({ id: data.id, value });
    }
  };

  return (
    <TextField
      type={type}
      select={select}
      className={className}
      InputProps={{classes: {formControl: classes.control}}}
      label={getLocale('defaultValue')}
      value={data.value}
      onChange={handleChange}
    >
      {options && options.map(opt => (
        <MenuItem key={opt.id} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </TextField>
  );
};

export default React.memo(DefaultValueSetting);