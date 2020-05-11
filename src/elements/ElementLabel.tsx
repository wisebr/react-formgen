import { Tooltip } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Info from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/styles';
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
  if (!tip) {
    return <>{text}</>;
  }
  const classes = useStyles();
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