import { IconButton } from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ElementSwitchProps } from './ElementSwitch';
import { InjectFormgenTheme, theme } from './theme';

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

const useStyles = makeStyles<InjectFormgenTheme, ElementWrapperProps>(({formgen = theme}) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      borderColor: formgen.palette.border.hover,
      cursor: ({onMoveElement}) => onMoveElement ? 'move' : 'default',
      '& $btn': {
        display: 'inline-flex',
      },
    },
    '&$actived': {
      borderColor: formgen.palette.border.selected,
      backgroundColor: formgen.palette.background.selected,
      '& $btn': {
        display: 'inline-flex',
      },
    },
  },
  btn: {
    color: formgen.palette.text.clickable,
  },
  actived: {},
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

  if (onMoveElement) {
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
