import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';

import FormgenContext from './FormgenContext';
import * as settings from './settings';
import { ElementData } from './types';

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
});

export interface SettingPanel {
  element?: ElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const SettingPanel: React.FC<SettingPanel> = ({element, onUpdateElement}) => {
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);
  if (!element) {
    return null;
  }

  const Component: React.ComponentType<any> = (settings as any)[
    `${element.type}Settings`
  ];

  if (!Component) {
    return <div className={classes.root}>{getLocale('noSettings')}</div>;
  }

  return (
    <div className={classes.root}>
      <Typography>{getLocale('formSettings')}</Typography>
      <Component data={element} onUpdateElement={onUpdateElement} />
    </div>
  );
};

export default SettingPanel;
