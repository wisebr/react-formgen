import { TextField, Typography } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';
import shortId from 'shortid';

import FormgenContext from '../../FormgenContext';
import { BaseSettingProps, SelectElementData } from '../../types';

export interface OptionsSetting extends BaseSettingProps {
  data: SelectElementData;
}

const useStyles = makeStyles({
  field: {
    marginRight: 10,
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
  if (data.settings.options === false) {
    return null;
  }

  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);
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
    <div className={className}>
      <Typography variant="body1">{getLocale('setting.options')}</Typography>
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