import { TextField } from '@mui/material';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { commonSx } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const HelpTipSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
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
      className={className}
      sx={commonSx.settingField}
      multiline
      label={getLocale('helpTip')}
      value={data.helpTip}
      onChange={handleChange}
    />
  );
};

export default React.memo(HelpTipSetting);
