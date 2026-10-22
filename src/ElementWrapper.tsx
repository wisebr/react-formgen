import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Clear from '@mui/icons-material/Clear';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ElementSwitchProps } from './ElementSwitch';
import { getFormgenTheme } from './theme';

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

const RemoveButton = styled(IconButton)(({ theme }) => ({
  color: getFormgenTheme(theme).palette.text.clickable,
}));

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'actived' && prop !== 'movable',
})<{ actived?: boolean; movable?: boolean }>(({ theme, actived, movable }) => {
  const formgen = getFormgenTheme(theme);
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 64,
    padding: '8px 16px',
    border: '1px solid rgba(0,0,0,0)',
    borderRadius: 3,
    transition: 'all linear .25s',
    marginBottom: 8,
    [`& ${RemoveButton}`]: {
      display: 'none',
    },
    '&:hover': {
      borderColor: formgen.palette.border.hover,
      cursor: movable ? 'move' : 'default',
      [`& ${RemoveButton}`]: {
        display: 'inline-flex',
      },
    },
    ...(actived && {
      borderColor: formgen.palette.border.selected,
      backgroundColor: formgen.palette.background.selected,
      [`& ${RemoveButton}`]: {
        display: 'inline-flex',
      },
    }),
    '&.fg-dragging': {
      opacity: .3
    },
  };
});

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

  const [collect, drag] = useDrag<
    { index: number },
    unknown,
    { isDragging: boolean }
  >({
    type: acceptDropType,
    item: { index },
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
    <Root
      ref={ref}
      actived={!!actived}
      movable={!!onMoveElement}
      className={classNames({ 'fg-dragging': isDragging })}
      onClick={onClick}
    >
      <div>{children}</div>
      <RemoveButton onClick={handleRemove}>
        <Clear />
      </RemoveButton>
    </Root>
  );
};

export default ElementWrapper;
