import { TextField } from '@mui/material';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const HelpTipSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
  const commonClasses = useCommonStyles();
  if (data.settings.helpTip === false) {
    return null;
  }

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, helpTip: value });
  };

  return (
    <TextField
      className={classNames(commonClasses.settingField, className)}
      multiline
      label={getLocale('helpTip')}
      value={data.helpTip}
      onChange={handleChange}
    />
  );
};

export default React.memo(HelpTipSetting);