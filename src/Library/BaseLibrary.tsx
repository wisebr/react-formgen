import React from 'react';

import { BASE_LIBRARY } from '../constants';
import Library from './Library';

const BaseLibrary = () => {
  return <Library name={BASE_LIBRARY.name} items={BASE_LIBRARY.items} />;
};

export default BaseLibrary;
