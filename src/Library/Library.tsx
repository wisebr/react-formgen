import { ListItem } from '@material-ui/core';
import React, { useContext } from 'react';

import FormgenContext from '../FormgenContext';
import { LibItemData } from '../types';
import LibraryItem from './LibraryItem';

export interface ElementLibProps {
  name: string;
  items: LibItemData[];
}

const Library: React.FC<ElementLibProps> = ({ name, items }) => {
  const { getLocale } = useContext(FormgenContext);
  return (
    <>
      <ListItem>{getLocale(`lib.${name}`)}</ListItem>
      <div>
        {items.map(item => (
          <LibraryItem key={item.name} name={item.name} />
        ))}
      </div>
    </>
  );
};

export default Library;
