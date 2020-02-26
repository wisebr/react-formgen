import { IconButton } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useCallback } from 'react';

export interface ElementWrapperProps {
  id: string;
  actived?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  onRemoveElement?: (id: string) => void;
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
  onRemoveElement,
}) => {
  const classes = useStyles();

  const handleRemove = useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (onRemoveElement) {
      onRemoveElement(id);
    }
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
