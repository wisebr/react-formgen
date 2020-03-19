import React, { useCallback } from 'react';

import { useCommonStyles } from '../styles';
import { ElementData } from '../types';
import {
  DefaultValueSetting,
  DisabledSetting,
  HelpTipSetting,
  LabelSetting,
  NameSetting,
  RequiredSetting,
} from './options';

export interface NumberFieldSettingsProps {
  data: ElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const NumberFieldSettings: React.FC<NumberFieldSettingsProps> = ({
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
      <DefaultValueSetting className={classes.settingField} data={data} update={updateElement} type="number" />
      <HelpTipSetting className={classes.settingField} data={data} update={updateElement} />
      <RequiredSetting className={classes.settingField} data={data} update={updateElement} />
      <DisabledSetting className={classes.settingField} data={data} update={updateElement} />
    </div>
  );
};

export default NumberFieldSettings;
