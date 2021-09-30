import { TextField } from '@mui/material';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const NameSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
  const commonClasses = useCommonStyles();
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
      className={classNames(commonClasses.settingField, className)}
      label={getLocale('varName')}
      required
      value={data.name}
      onChange={handleChange}
    />
  );
};

export default React.memo(NameSetting);