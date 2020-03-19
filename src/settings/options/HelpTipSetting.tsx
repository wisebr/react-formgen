import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps } from '../../types';

const HelpTipSetting: React.FC<BaseSettingProps> = ({data, className, update}) => {
  if (data.settings.helpTip === false) {
    return null;
  }
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, helpTip: value });
  };

  return (
    <TextField
      className={className}
      label={getLocale('helpTip')}
      value={data.helpTip}
      onChange={handleChange}
    />
  );
};

export default React.memo(HelpTipSetting);