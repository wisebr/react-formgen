import { ListItem } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { FormgenContext } from '..';
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
});

const LibraryItem: React.FC<LibraryItemProps> = ({ data: {element, id}, dragType }) => {
  const { getLocale } = useContext(FormgenContext);
  const classes = useStyles();
  const [collectedProps, drag] = useDrag<LibraryDragItem, void, {}>({
    item: { element, type: dragType, id },
  });
  console.log(collectedProps);

  return (
    <ListItem className={classes.root} ref={drag}>
      {getLocale(`lib.${element.type}`)}
    </ListItem>
  );
};

export default LibraryItem;
