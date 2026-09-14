import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { commonSx } from '../../styles';
import { BaseSettingOptionProps } from '../../types';

const RequiredSetting: React.FC<BaseSettingOptionProps> = ({data, className, update}) => {
  const { getLocale } = useContext(FormgenContext);
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
      className={className}
      sx={commonSx.settingField}
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
