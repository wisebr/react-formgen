import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps } from '../../types';

const LabelSetting: React.FC<BaseSettingProps> = ({data, className, update}) => {
  if (data.settings.label === false) {
    return null;
  }
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, label: value });
  };

  return (
    <TextField
      className={className}
      label={getLocale('label')}
      value={data.label}
      onChange={handleChange}
    />
  );
};

export default React.memo(LabelSetting);