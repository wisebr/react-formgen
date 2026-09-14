import { TextField } from '@mui/material';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { commonSx } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const NameSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
  if (data.settings.name === false) {
    return null;
  }

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, name: value });
  };

  return (
    <TextField
      className={className}
      sx={commonSx.settingField}
      label={getLocale('varName')}
      required
      value={data.name}
      onChange={handleChange}
    />
  );
};

export default React.memo(NameSetting);
