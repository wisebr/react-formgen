import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const LabelSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const commonClasses = useCommonStyles();
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
      className={classNames(commonClasses.settingField, className)}
      label={getLocale('label')}
      value={data.label}
      onChange={handleChange}
    />
  );
};

export default React.memo(LabelSetting);