import React, { useCallback } from 'react';

import { useCommonStyles } from '../styles';
import { ElementData } from '../types';
import { DisabledSetting, HelpTipSetting, LabelSetting, NameSetting, RequiredSetting } from './options';

export interface DateTimePickerSettingsProps {
  data: ElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const DateTimePickerSettings: React.FC<DateTimePickerSettingsProps> = ({
  data,
  onUpdateElement,
}) => {
  const classes = useCommonStyles();
  const updateElement = useCallback((payload: Partial<ElementData>) => {
    if (onUpdateElement) {
      onUpdateElement(payload);
    }
  }, []);
  return (
    <div>
      <NameSetting className={classes.settingField} data={data} update={updateElement} />
      <LabelSetting className={classes.settingField} data={data} update={updateElement} />
      <HelpTipSetting className={classes.settingField} data={data} update={updateElement} />
      <RequiredSetting className={classes.settingField} data={data} update={updateElement} />
      <DisabledSetting className={classes.settingField} data={data} update={updateElement} />
    </div>
  );
};

export default DateTimePickerSettings;
