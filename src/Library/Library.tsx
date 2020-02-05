import { ListItem } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../FormgenContext';
import { LibItemData } from '../types';
import LibraryItem from './LibraryItem';

export interface ElementLibProps {
  name: string;
  items: LibItemData[];
  dragType: string;
}

const Library: React.FC<ElementLibProps> = ({ name, items, dragType }) => {
  const { getLocale } = useContext(FormgenContext);
  return (
    <>
      <ListItem>{getLocale(`lib.${name}`)}</ListItem>
      <div>
        {items.map(item => (
          <LibraryItem key={item.name} element={item.element} dragType={dragType} />
        ))}
      </div>
    </>
  );
};

export default Library;
