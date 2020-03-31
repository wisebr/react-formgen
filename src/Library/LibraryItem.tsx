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
}, {name: 'fg-LibraryItem'});

const LibraryItem: React.FC<LibraryItemProps> = ({ data: {element, id, name}, dragType }) => {
  const { getLocale } = useContext(FormgenContext);
  const [{isDragging}, drag] = useDrag({
    item: { element, type: dragType, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classes = useStyles({isDragging});

  if (BASE_ELEMENT_SET.has(element.type)) {
    name = getLocale(`lib.element.${element.type}`);
  } else {
    name = name || getLocale(`lib.element.${element.type}`);
  }

  return (
    <ListItem className={classes.root} ref={drag}>
      {name}
    </ListItem>
  );
};

export default React.memo(LibraryItem);
