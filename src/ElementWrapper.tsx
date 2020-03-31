import { IconButton } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ElementSwitchProps } from './ElementSwitch';

export interface ElementWrapperProps {
  id: string;
  children: React.FunctionComponentElement<ElementSwitchProps>;
  index: number;
  actived?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  onRemoveElement?: (id: string) => void;
  onMoveElement?: (index: number, target: number) => void;
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
      cursor: 'move',
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
  dragging: {
    opacity: .3
  },
}));

interface WrapperDragItem {
  type: string;
  index: number;
}

const ElementWrapper: React.FC<ElementWrapperProps> = ({
  children,
  id,
  index,
  actived,
  onClick,
  onRemoveElement,
  onMoveElement,
}) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  React.Children.only(children);

  const [, drop] = useDrop<WrapperDragItem, void, {}>({
    accept: 'wrapper',
    hover: (item) => {
      if (item.index === index) {
        return;
      }
      if (onMoveElement) {
        onMoveElement(item.index, index);
        item.index = index;
      }
    }
  });

  const [{isDragging}, drag] = useDrag({
    item: { type: 'wrapper', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleRemove = useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (onRemoveElement) {
      onRemoveElement(id);
    }
  }, []);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames(classes.root, {
        [classes.actived]: !!actived,
        [classes.dragging]: isDragging,
      })}
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
