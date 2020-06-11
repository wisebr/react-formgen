import React, { useCallback } from 'react';

import { BaseSettingProps, CheckboxElementData } from '../types';
import {
  DefaultValueSetting,
  DisabledSetting,
  HelpTipSetting,
  LabelSetting,
  NameSetting,
  RequiredSetting,
} from './options';

const options = [{
  id: '1',
  label: 'true',
  value: 'true'
}, {
  id: '2',
  label: 'false',
  value: 'false'
}];

export interface CheckboxSettingsProps extends BaseSettingProps<CheckboxElementData> {
}

const CheckboxSettings: React.FC<CheckboxSettingsProps> = ({
  data,
  onUpdateElement,
}) => {
  const updateElement = useCallback((payload: Partial<CheckboxElementData>) => {
    if (onUpdateElement) {
      onUpdateElement(payload);
    }
  }, []);
  return (
    <div>
      <NameSetting data={data} update={updateElement} />
      <LabelSetting data={data} update={updateElement} />
      <DefaultValueSetting
        data={data}
        select
        options={options}
        transValueToBool
        update={updateElement}
      />
      <HelpTipSetting data={data} update={updateElement} />
      <RequiredSetting data={data} update={updateElement} />
      <DisabledSetting data={data} update={updateElement} />
    </div>
  );
};

export default CheckboxSettings;
