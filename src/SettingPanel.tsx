import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';

import FormgenContext from './FormgenContext';
import * as settings from './settings';

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
});

const SettingPanel: React.FC = () => {
  const classes = useStyles();
  const { activedElement, getLocale } = useContext(FormgenContext);
  if (!activedElement) {
    return <div className={classes.root}>{getLocale('noSettings')}</div>;
  }

  const Component: React.ComponentType<any> = (settings as any)[
    `${activedElement.type}Settings`
  ];

  if (!Component) {
    return <div className={classes.root}>{getLocale('noSettings')}</div>;
  }

  return (
    <div className={classes.root}>
      <Typography>{getLocale('formSettings')}</Typography>
      <Component data={activedElement} />
    </div>
  );
};

export default SettingPanel;
