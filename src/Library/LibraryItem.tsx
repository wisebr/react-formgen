import { ListItem } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { FormgenContext } from '..';
import { ElementOptions, LibraryDragItem } from '../types';

export interface LibraryItemProps {
  element: ElementOptions;
  dragType: string;
}

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: grey[100],
      cursor: 'move',
    },
  },
});

const LibraryItem: React.FC<LibraryItemProps> = ({ element, dragType }) => {
  const { getLocale } = useContext(FormgenContext);
  const classes = useStyles();
  const [collectedProps, drag] = useDrag<LibraryDragItem, void, {}>({
    item: { element, type: dragType },
  });
  console.log(collectedProps);

  return (
    <ListItem className={classes.root} ref={drag}>
      {getLocale(`lib.${element.type}`)}
    </ListItem>
  );
};

export default LibraryItem;
