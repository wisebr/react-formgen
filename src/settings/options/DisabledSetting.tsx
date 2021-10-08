import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const DisabledSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
  const commonClasses = useCommonStyles();
  if (data.settings.disabled === false) {
    return null;
  }

  const handleChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, disabled: checked });
  };

  return (
    <FormControl
      className={classNames(commonClasses.settingField, className)}
    >
      <FormControlLabel
        label={getLocale('disabled')}
        control={
          <Checkbox checked={data.disabled} onChange={handleChange} />
        }
      />
    </FormControl>
  );
};

export default React.memo(DisabledSetting);