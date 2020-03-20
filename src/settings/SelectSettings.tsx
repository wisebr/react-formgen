import React, { useCallback } from 'react';

import { useCommonStyles } from '../styles';
import { ElementData, SelectElementData } from '../types';
import {
  DefaultValueSetting,
  DisabledSetting,
  HelpTipSetting,
  LabelSetting,
  NameSetting,
  RequiredSetting,
} from './options';
import OptionsSetting from './options/OptionsSetting';

export interface SelectSettingsProps {
  data: SelectElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const SelectSettings: React.FC<SelectSettingsProps> = ({
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
      <DefaultValueSetting
        className={classes.settingField}
        data={data}
        select
        options={data.props.options}
        update={updateElement}
      />
      <HelpTipSetting className={classes.settingField} data={data} update={updateElement} />
      <RequiredSetting className={classes.settingField} data={data} update={updateElement} />
      <DisabledSetting className={classes.settingField} data={data} update={updateElement} />
      <OptionsSetting className={classes.settingField} data={data} update={updateElement} />
    </div>
  );
};

export default SelectSettings;
