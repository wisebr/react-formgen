import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps } from '../../types';

const DisabledSetting: React.FC<BaseSettingProps> = ({data, className, update}) => {
  if (data.settings.disabled === false) {
    return null;
  }
  const { getLocale } = useContext(FormgenContext);

  const handleChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    update({ id: data.id, disabled: checked });
  };

  return (
    <FormControl className={className}>
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