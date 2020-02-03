import { IconButton } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';

import FormgenContext from './FormgenContext';

export interface ElementWrapperProps {
  id: string;
  actived?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 64,
    padding: '8px 16px',
    '& $btn': {
      display: 'none',
    },
    '&:hover': {
      // backgroundColor: lightBlue[100],
      // cursor: 'move',
      '& $btn': {
        display: 'block',
      },
    },
    '&$actived': {
      backgroundColor: lightBlue[100],
      '& $btn': {
        display: 'block',
      },
    },
  },
  btn: {},
  actived: {
    backgroundColor: lightBlue[100],
  },
}));

const ElementWrapper: React.FC<ElementWrapperProps> = ({
  children,
  id,
  actived,
  onClick,
}) => {
  const classes = useStyles();
  const { dispatchElement } = useContext(FormgenContext);

  const handleRemove = useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    dispatchElement({ type: 'REMOVE_ELEMENT', payload: id });
  }, []);

  return (
    <div
      className={classNames(classes.root, { [classes.actived]: !!actived })}
      onClick={onClick}
    >
      <div>{children}</div>
      <IconButton className={classes.btn} onClick={handleRemove}>
        <Clear />
      </IconButton>
    </div>
  );
};

export default ElementWrapper;
