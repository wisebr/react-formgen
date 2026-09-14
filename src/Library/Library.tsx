import { ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';

import FormgenContext from '../FormgenContext';
import { getFormgenTheme } from '../theme';
import { LibItemData } from '../types';
import LibraryItem from './LibraryItem';

export interface ElementLibProps {
  className?: string;
  name: string;
  items: LibItemData[];
  dragType: string;
}

const Header = styled(ListItem)(({ theme }) => ({
  background: getFormgenTheme(theme).palette.background.head,
}));

const Library: React.FC<ElementLibProps> = ({ className, name, items, dragType }) => {
  const { getLocale } = useContext(FormgenContext);
  return (
    <div className={className}>
      <Header>
        <Typography variant="subtitle1">{getLocale(`lib.${name}`)}</Typography>
      </Header>
      <div>
        {items.map((item) => (
          <LibraryItem key={item.id} data={item} dragType={dragType} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Library);
