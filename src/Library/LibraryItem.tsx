import { ListItem } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

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
    marginRight: 8,
    color: grey[700],
    position: 'relative',
    top: 2,
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
  let icon: React.ReactNode = thumb;
  const key = thumb || name;
  if (key && typeof key === 'string') {
    const Comp = iconMap[key];
    if (Comp) {
      icon = <Comp />;
    }
  }

  const label = name || getLocale(`lib.element.${element.type}`);

  return (
    <ListItem className={classes.root} ref={drag}>
      <span className={classes.icon}>
        {icon}
      </span>
      {label}
    </ListItem>
  );
};

export default React.memo(LibraryItem);
