import { MenuItem, TextField } from '@mui/material';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { commonSx } from '../../styles';
import { BaseSettingOptionProps, SelectOption } from '../../types';

export interface DefaultValueSettingProps extends BaseSettingOptionProps {
  type?: 'number' | 'text';
  select?: boolean;
  options?: SelectOption[];
  transValueToBool?: boolean;
}

const DefaultValueSetting: React.FC<DefaultValueSettingProps> = ({
  data, className, update, type, select, options, transValueToBool
}) => {
  const { getLocale } = useContext(FormgenContext);
  if (data.settings.value === false) {
    return null;
  }

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
      sx={[commonSx.settingField, { minWidth: 166 }]}
      label={getLocale('defaultValue')}
      value={data.value}
      onChange={handleChange}
    >
      {options && options.map((opt) => (
        <MenuItem key={opt.id} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </TextField>
  );
};

export default React.memo(DefaultValueSetting);
