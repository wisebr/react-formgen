import { MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps, SelectOption } from '../../types';

export interface DefaultValueSettingProps extends BaseSettingOptionProps {
  type?: 'number' | 'text';
  select?: boolean;
  options?: SelectOption[];
  transValueToBool?: boolean;
}

const useStyles = makeStyles({
  control: {
    minWidth: 166,
  }
}, {name: 'fg-DefaultValueSetting'});

const DefaultValueSetting: React.FC<DefaultValueSettingProps> = ({
  data, className, update, type, select, options, transValueToBool
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { getLocale } = useContext(FormgenContext);
  if (data.settings.value === false) {
    return null;
  }

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (transValueToBool) {
      update({ id: data.id, value: value === 'true' });
    } else {
      update({ id: data.id, value });
    }
  };

  return (
    <TextField
      type={type}
      select={select}
      className={classNames(commonClasses.settingField, className)}
      InputProps={{classes: {formControl: classes.control}}}
      label={getLocale('defaultValue')}
      value={data.value}
      onChange={handleChange}
    >
      {options && options.map((opt) => (
        <MenuItem key={opt.id} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </TextField>
  );
};

export default React.memo(DefaultValueSetting);