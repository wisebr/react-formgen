import { ListItem } from '@material-ui/core';
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

const Library: React.FC<ElementLibProps> = ({ className, name, items, dragType }) => {
  const { getLocale } = useContext(FormgenContext);
  return (
    <div className={className}>
      <ListItem>{getLocale(`lib.${name}`)}</ListItem>
      <div>
        {items.map(item => (
          <LibraryItem key={item.id} data={item} dragType={dragType} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Library);
