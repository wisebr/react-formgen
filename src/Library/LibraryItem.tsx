import { ListItem } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { BASE_ELEMENT_SET } from '../constants';
import FormgenContext from '../FormgenContext';
import { LibItemData } from '../types';

export interface LibraryItemProps {
  data: LibItemData;
  dragType: string;
  key: string;
}

interface DragProps {
  isDragging: boolean;
}

const useStyles = makeStyles<{}, DragProps>({
  root: {
    opacity: ({isDragging}) => isDragging ? .4 : 1,
    border: ({isDragging}) => `1px dashed ${isDragging ? grey[500] : 'rgba(0,0,0,0)'}`,
    '&:hover': {
      backgroundColor: grey[100],
      cursor: 'move',
    },
  },
  icon: {
    marginRight: 10,
    color: grey[700],
  },
}, {name: 'fg-LibraryItem'});

const LibraryItem: React.FC<LibraryItemProps> = ({ data: {element, id, name, thumb}, dragType }) => {
  const { getLocale, iconMap } = useContext(FormgenContext);
  const [{isDragging}, drag] = useDrag({
    item: { element, type: dragType, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classes = useStyles({isDragging});
  let icon: React.ReactNode | null = null;
  if (typeof thumb === 'string' && iconMap[thumb || name]) {
    const Comp = iconMap[thumb || name];
    icon = Comp ? <Comp className={classes.icon} /> : thumb;
  }

  let label = name;

  if (BASE_ELEMENT_SET.has(element.type)) {
    label = getLocale(`lib.element.${element.type}`);
  } else {
    label = label || getLocale(`lib.element.${element.type}`);
  }

  return (
    <ListItem className={classes.root} ref={drag}>
      {icon} {label}
    </ListItem>
  );
};

export default React.memo(LibraryItem);
