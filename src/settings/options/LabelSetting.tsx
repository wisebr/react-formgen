import { TextField } from '@mui/material';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { commonSx } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const LabelSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
  if (data.settings.label === false) {
    return null;
  }

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, label: value });
  };

  return (
    <TextField
      className={className}
      sx={commonSx.settingField}
      label={getLocale('label')}
      value={data.label}
      onChange={handleChange}
    />
  );
};

export default React.memo(LabelSetting);
