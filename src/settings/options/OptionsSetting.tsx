import { TextField, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';
import shortId from 'shortid';

import FormgenContext from '../../FormgenContext';
import { useCommonStyles } from '../../styles';
import { BaseSettingOptionProps, SelectElementData } from '../../types';

export interface OptionsSetting extends BaseSettingOptionProps {
  data: SelectElementData;
}

const useStyles = makeStyles({
  title: {
    marginBottom: 10,
  },
  field: {
    marginRight: 10,
    marginBottom: 10,
    width: 100,
  },
  option: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    color: grey[500],
    cursor: 'pointer',
    marginRight: 4,
  },
  removeBtn: {
    '&:hover': {
      color: red[500],
    }
  },
  addBtn: {
    '&:hover': {
      color: green[500],
    }
  }
}, {name: 'fg-OptionsSetting'});

const OptionsSetting: React.FC<OptionsSetting> = ({data, className, update}) => {
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);
  const commonClasses = useCommonStyles();
  if (data.settings.options === false) {
    return null;
  }

  const {options} = data.props;

  // TODO: store the options in component state
  const createChangeLabelHandler = (id: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = options.map((opt) => opt.id === id ? {...opt, label: ev.target.value} : opt);
    update({ id: data.id, props: {...data.props, options: newOptions} });
  };

  const createChangeValueHandler = (id: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = options.map((opt) => opt.id === id ? {...opt, value: ev.target.value} : opt);
    update({ id: data.id, props: {...data.props, options: newOptions} });
  };

  const createRemoveOptHandler = (id: string) => () => {
    update({ id: data.id, props: {...data.props, options: options.filter((opt) => opt.id !== id)} });
  };

  const createAddOptHandler = (index: number) => () => {
    const newOptions: typeof options = [];
    options.forEach((opt, i) => {
      newOptions.push(opt);
      if (index === i) {
        newOptions.push({id: shortId(), label: '', value: ''});
      }
    });
    update({ id: data.id, props: {...data.props, options: newOptions} });
  };

  return (
    <div
      className={classNames(commonClasses.settingField, className)}
    >
      <Typography variant="body1" className={classes.title}>
        {getLocale('setting.options')}
      </Typography>
      {options.map((opt, i) => (
        <div key={opt.id} className={classes.option}>
          <TextField
            className={classes.field}
            label={getLocale('setting.optionName')}
            required
            value={opt.label}
            onChange={createChangeLabelHandler(opt.id)}
          />
          <TextField
            className={classes.field}
            label={getLocale('setting.optionValue')}
            required
            value={opt.value}
            onChange={createChangeValueHandler(opt.id)}
          />
          <RemoveCircle
            className={classNames(classes.btn, classes.removeBtn)}
            onClick={createRemoveOptHandler(opt.id)}
          />
          <AddCircle
            className={classNames(classes.btn, classes.addBtn)}
            onClick={createAddOptHandler(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(OptionsSetting);