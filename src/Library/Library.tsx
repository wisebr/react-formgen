import { ListItem, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';

import FormgenContext from '../FormgenContext';
import { LibItemData } from '../types';
import LibraryItem from './LibraryItem';

export interface ElementLibProps {
  className?: string;
  name: string;
  items: LibItemData[];
  dragType: string;
}

const useStyles = makeStyles({
  header: {
    background: grey[300],
  }
});

const Library: React.FC<ElementLibProps> = ({ className, name, items, dragType }) => {
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);
  return (
    <div className={className}>
      <ListItem className={classes.header}>
        <Typography variant="subtitle1">{getLocale(`lib.${name}`)}</Typography>
      </ListItem>
      <div>
        {items.map((item) => (
          <LibraryItem key={item.id} data={item} dragType={dragType} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Library);
