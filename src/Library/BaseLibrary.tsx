import React from 'react';

import { BASE_LIBRARY, BASE_LIBRARY_TYPE } from '../constants';
import Library from './Library';

export interface BaseLibraryProps {
  dragType?: string;
}

const BaseLibrary: React.FC<BaseLibraryProps> = ({dragType = BASE_LIBRARY_TYPE}) => {
  return <Library name={BASE_LIBRARY.name} items={BASE_LIBRARY.items} dragType={dragType} />;
};

export default BaseLibrary;
