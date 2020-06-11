import React, { useCallback } from 'react';

import { BaseSettingProps, SelectElementData } from '../types';
import {
  DefaultValueSetting,
  DisabledSetting,
  HelpTipSetting,
  LabelSetting,
  NameSetting,
  RequiredSetting,
} from './options';
import OptionsSetting from './options/OptionsSetting';

export interface SelectSettingsProps extends BaseSettingProps<SelectElementData> {
}

const SelectSettings: React.FC<SelectSettingsProps> = ({
  data,
  onUpdateElement,
}) => {
  const updateElement = useCallback((payload: Partial<SelectElementData>) => {
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
        options={data.props.options}
        update={updateElement}
      />
      <HelpTipSetting data={data} update={updateElement} />
      <RequiredSetting data={data} update={updateElement} />
      <DisabledSetting data={data} update={updateElement} />
      <OptionsSetting data={data} update={updateElement} />
    </div>
  );
};

export default SelectSettings;
