import React, { useCallback } from 'react';

import { useCommonStyles } from '../styles';
import { CheckboxElementData } from '../types';
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

export interface CheckboxSettingsProps {
  data: CheckboxElementData;
  onUpdateElement?: (payload: Partial<CheckboxElementData>) => void;
}

const CheckboxSettings: React.FC<CheckboxSettingsProps> = ({
  data,
  onUpdateElement,
}) => {
  const classes = useCommonStyles();
  const updateElement = useCallback((payload: Partial<CheckboxElementData>) => {
    if (onUpdateElement) {
      onUpdateElement(payload);
    }
  }, []);
  return (
    <div>
      <NameSetting className={classes.settingField} data={data} update={updateElement} />
      <LabelSetting className={classes.settingField} data={data} update={updateElement} />
      <DefaultValueSetting
        className={classes.settingField}
        data={data}
        select
        options={options}
        transValueToBool
        update={updateElement}
      />
      <HelpTipSetting className={classes.settingField} data={data} update={updateElement} />
      <RequiredSetting className={classes.settingField} data={data} update={updateElement} />
      <DisabledSetting className={classes.settingField} data={data} update={updateElement} />
    </div>
  );
};

export default CheckboxSettings;
