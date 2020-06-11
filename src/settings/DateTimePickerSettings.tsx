import React, { useCallback } from 'react';

import { BaseSettingProps, ElementData } from '../types';
import { DisabledSetting, HelpTipSetting, LabelSetting, NameSetting, RequiredSetting } from './options';

const DateTimePickerSettings: React.FC<BaseSettingProps> = ({
  data,
  onUpdateElement,
}) => {
  const updateElement = useCallback((payload: Partial<ElementData>) => {
    if (onUpdateElement) {
      onUpdateElement(payload);
    }
  }, []);
  return (
    <div>
      <NameSetting data={data} update={updateElement} />
      <LabelSetting data={data} update={updateElement} />
      <HelpTipSetting data={data} update={updateElement} />
      <RequiredSetting data={data} update={updateElement} />
      <DisabledSetting data={data} update={updateElement} />
    </div>
  );
};

export default DateTimePickerSettings;
