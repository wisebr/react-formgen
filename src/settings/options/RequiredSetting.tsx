import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps } from '../../types';

const RequiredSetting: React.FC<BaseSettingProps> = ({data, className, update}) => {
  if (data.settings.required === false) {
    return null;
  }
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, required: checked });
  };

  return (
    <FormControl className={className}>
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