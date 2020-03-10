import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps } from '../../types';

interface DefaultValueSettingProps extends BaseSettingProps {
  type?: 'number' | 'text';
}

const DefaultValueSetting: React.FC<DefaultValueSettingProps> = ({data, className, update, type}) => {
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
      className={className}
      label={getLocale('defaultValue')}
      value={data.value}
      onChange={handleChange}
    />
  );
};

export default React.memo(DefaultValueSetting);