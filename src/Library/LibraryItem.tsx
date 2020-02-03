import { ListItem } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { FormgenContext } from '..';
import { LibraryDragItem } from '../types';

export interface LibraryItemProps {
  name: string;
}

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: grey[100],
      cursor: 'move',
    },
  },
});

const LibraryItem: React.FC<LibraryItemProps> = ({ name }) => {
  const { getLocale } = useContext(FormgenContext);
  const classes = useStyles();
  const [collectedProps, drag] = useDrag<LibraryDragItem, void, {}>({
    item: { name, type: 'library' },
  });
  console.log(collectedProps);

  return (
    <ListItem className={classes.root} ref={drag}>
      {getLocale(`lib.${name}`)}
    </ListItem>
  );
};

export default LibraryItem;
