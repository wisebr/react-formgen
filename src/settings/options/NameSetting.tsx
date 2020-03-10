import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps } from '../../types';

const NameSetting: React.FC<BaseSettingProps> = ({data, className, update}) => {
  if (data.settings.name === false) {
    return null;
  }
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, name: value });
  };

  return (
    <TextField
      className={className}
      label={getLocale('varName')}
      value={data.name}
      onChange={handleChange}
    />
  );
};

export default React.memo(NameSetting);