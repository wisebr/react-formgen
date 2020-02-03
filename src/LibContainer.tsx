import { List, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import FormgenContext from './FormgenContext';
import { BaseLibrary } from './Library';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
  },
}));

export interface LibContainerProps {
  className?: string;
}

const LibContainer: React.FC<LibContainerProps> = ({ className, children }) => {
  const { getLocale } = React.useContext(FormgenContext);
  const classes = useStyles();

  return (
    <List
      className={classNames(classes.root, className)}
      subheader={<ListSubheader>{getLocale('lib.title')}</ListSubheader>}
    >
      {!!React.Children.count(children) ? children : <BaseLibrary />}
    </List>
  );
};

export default LibContainer;
