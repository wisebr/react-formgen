import { ListItem } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { BASE_ELEMENT_SET } from '../constants';
import FormgenContext from '../FormgenContext';
import { LibItemData, LibraryDragItem } from '../types';

export interface LibraryItemProps {
  data: LibItemData;
  dragType: string;
  key: string;
}

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: grey[100],
      cursor: 'move',
    },
  },
}, {name: 'fg-LibraryItem'});

const LibraryItem: React.FC<LibraryItemProps> = ({ data: {element, id, name}, dragType }) => {
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);
  const [, drag] = useDrag<LibraryDragItem, void, {}>({
    item: { element, type: dragType, id },
  });

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
