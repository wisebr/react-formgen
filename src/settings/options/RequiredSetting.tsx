import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const RequiredSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
  const commonClasses = useCommonStyles();
  if (data.settings.required === false) {
    return null;
  }

  const handleChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, required: checked });
  };

  return (
    <FormControl
      className={classNames(commonClasses.settingField, className)}
    >
      <FormControlLabel
        label={getLocale('required')}
        control={
          <Checkbox checked={data.required} onChange={handleChange} />
        }
      />
    </FormControl>
  );
};

export default React.memo(RequiredSetting);