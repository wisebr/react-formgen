import { Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import Info from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import React from 'react';

export interface ElementLabelProps {
  text: string;
  tip?: string;
}

const TipIcon = styled(Info)({
  fontSize: 13,
  marginLeft: 8,
  color: grey[500],
});

const ElementLabel: React.FC<ElementLabelProps> = ({text, tip}) => {
  if (!tip) {
    return <>{text}</>;
  }
  return (
    <>
      {text}
      <Tooltip title={tip} placement="top">
        <TipIcon />
      </Tooltip>
    </>
  );
};

export default ElementLabel;
