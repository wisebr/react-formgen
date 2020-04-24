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
  acceptDropType?: string;
  onClick?: (ev: React.MouseEvent) => void;
  onRemoveElement?: (id: string) => void;
  onMoveElement?: (index: number, target: number) => void;
}

const useStyles = makeStyles<{}, ElementWrapperProps>(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 64,
    padding: '8px 16px',
    border: '1px solid rgba(0,0,0,0)',
    borderRadius: 3,
    transition: 'all linear .25s',
    marginBottom: 8,
    '& $btn': {
      display: 'none',
    },
    '&:hover': {
      borderColor: lightBlue[100],
      cursor: ({onMoveElement}) => onMoveElement ? 'move' : 'default',
      '& $btn': {
        display: 'block',
      },
    },
    '&$actived': {
      borderColor: lightBlue[200],
      backgroundColor: lightBlue[100],
      '& $btn': {
        display: 'block',
      },
    },
  },
  btn: {
    color: lightBlue[600],
  },
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

const ElementWrapper: React.FC<ElementWrapperProps> = (props) => {
  const {
    children,
    id,
    index,
    actived,
    acceptDropType = 'elementWrapper',
    onClick,
    onRemoveElement,
    onMoveElement,
  } = props;
  const classes = useStyles(props);
  const ref = useRef<HTMLDivElement>(null);
  let isDragging = false;

  React.Children.only(children);

  if (onMoveElement) {
    const [, drop] = useDrop<WrapperDragItem, void, {}>({
      accept: acceptDropType,
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

    const [collect, drag] = useDrag({
      item: { type: acceptDropType, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    isDragging = collect.isDragging;

    drag(drop(ref));
  }

  const handleRemove = useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (onRemoveElement) {
      onRemoveElement(id);
    }
  }, []);

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
