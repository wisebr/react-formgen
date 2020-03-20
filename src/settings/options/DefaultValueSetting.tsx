import { MenuItem, TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps, SelectOption } from '../../types';

interface DefaultValueSettingProps extends BaseSettingProps {
  type?: 'number' | 'text';
  select?: boolean;
  options?: SelectOption[];
}

const DefaultValueSetting: React.FC<DefaultValueSettingProps> = ({data, className, update, type, select, options}) => {
  if (data.settings.value === false) {
    return null;
  }
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, value });
  };

  return (
    <TextField
      type={type}
      select={select}
      className={className}
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