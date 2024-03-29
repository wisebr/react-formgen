import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';

import FormgenContext from './FormgenContext';
import { ElementData } from './types';

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
  title: {
    marginBottom: 15,
  },
});

export interface SettingPanel {
  element?: ElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const SettingPanel: React.FC<SettingPanel> = ({element, onUpdateElement}) => {
  const classes = useStyles();
  const { getLocale, settingMap } = useContext(FormgenContext);
  if (!element) {
    return null;
  }

  const Component: React.ComponentType<any> = settingMap[element.type];

  if (!Component) {
    return <div className={classes.root}>{getLocale('noSettings')}</div>;
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{getLocale('formSettings')}</Typography>
      <Component data={element} onUpdateElement={onUpdateElement} />
    </div>
  );
};

export default SettingPanel;
