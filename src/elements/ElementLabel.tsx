import { Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import Info from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import React from 'react';

export interface ElementLabelProps {
  text: string;
  tip?: string;
}

const useStyles = makeStyles({
  icon: {
    fontSize: 13,
    marginLeft: 8,
    color: grey[500],
  }
}, {name: 'fg-ElementLabel'});

const ElementLabel: React.FC<ElementLabelProps> = ({text, tip}) => {
  const classes = useStyles();
  if (!tip) {
    return <>{text}</>;
  }
  return (
    <>
      {text}
      <Tooltip title={tip} placement="top">
        <Info className={classes.icon} />
      </Tooltip>
    </>
  );
};

export default ElementLabel;