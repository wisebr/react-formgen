import { ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';

import FormgenContext from '../FormgenContext';
import { InjectFormgenTheme } from '../theme';
import { LibItemData } from '../types';
import LibraryItem from './LibraryItem';

export interface ElementLibProps {
  className?: string;
  name: string;
  items: LibItemData[];
  dragType: string;
}

const useStyles = makeStyles<InjectFormgenTheme>(({formgen}) => ({
  header: {
    background: formgen.palette.background.head,
  }
}));

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
