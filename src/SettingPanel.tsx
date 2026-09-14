import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';

import FormgenContext from './FormgenContext';
import { ElementData } from './types';

const Root = styled('div')({
  padding: 10,
});

const Title = styled(Typography)({
  marginBottom: 15,
});

export interface SettingPanel {
  element?: ElementData;
  onUpdateElement?: (payload: Partial<ElementData>) => void;
}

const SettingPanel: React.FC<SettingPanel> = ({element, onUpdateElement}) => {
  const { getLocale, settingMap } = useContext(FormgenContext);
  if (!element) {
    return null;
  }

  const Component: React.ComponentType<any> = settingMap[element.type];

  if (!Component) {
    return <Root>{getLocale('noSettings')}</Root>;
  }

  return (
    <Root>
      <Title>{getLocale('formSettings')}</Title>
      <Component data={element} onUpdateElement={onUpdateElement} />
    </Root>
  );
};

export default SettingPanel;
