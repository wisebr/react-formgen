import { List, ListSubheader } from '@material-ui/core';
import React from 'react';

import FormgenContext from './FormgenContext';
import { BaseLibrary } from './Library';

export interface LibContainerProps {
  className?: string;
}

const LibContainer: React.FC<LibContainerProps> = ({ className, children }) => {
  const { getLocale } = React.useContext(FormgenContext);

  return (
    <List
      className={className}
      subheader={<ListSubheader>{getLocale('lib.title')}</ListSubheader>}
    >
      {!!React.Children.count(children) ? children : <BaseLibrary />}
    </List>
  );
};

export default LibContainer;
