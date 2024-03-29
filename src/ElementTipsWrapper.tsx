import { Chip, Grid } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Info from '@mui/icons-material/Info';
import { ClassNameMap, makeStyles, mergeClasses, StyledComponentProps } from '@mui/styles';
import React, { useMemo } from 'react';
import { InjectFormgenTheme } from './theme';

const useStyles = makeStyles<InjectFormgenTheme>(({palette}) => ({
  field: {
    padding: 10,
    marginBottom: 15,
    '&:last-of-type': {
      marginBottom: 30,
    },
    '&:hover': {
      backgroundColor: palette.action.hover,
      '& $fieldInfo': {
        display: 'block'
      }
    }
  },
  fieldInfo: {
    display: 'none',
    '& svg': {
      position: 'relative',
      top: 2,
      fontSize: 14,
      color: blueGrey[500],
      marginRight: 8
    }
  },
  variable: {
    cursor: 'default'
  }
}));

export interface ElementTipsWrapperProps extends StyledComponentProps<keyof ReturnType<typeof useStyles>>  {
  name: string;
  helpTip: string;
  renderName?: (name: string) => React.ReactNode;
}

export const ElementTipsWrapper: React.FC<ElementTipsWrapperProps> = ({
  classes: newClasses, name, helpTip, children, renderName
}) => {
  const baseClasses = useStyles();
  const classes = useMemo(() => newClasses ? mergeClasses({
    baseClasses,
    newClasses,
    Component: ElementTipsWrapper
  }) : baseClasses, [newClasses, baseClasses]) as ClassNameMap<"field" | "fieldInfo" | "variable">;

  return (
    <Grid container spacing={2} className={classes.field} alignItems="center">
      <Grid item sm={4} lg={3}>
        {children}
      </Grid>
      <Grid item sm={3} lg={2} className={classes.fieldInfo}>
        {renderName ? renderName(name) : (
          <Chip
            className={classes.variable}
            size="small"
            label={`${name}`}
            clickable
            color="primary"
          />
        )}
      </Grid>
      {!!helpTip && (
        <Grid item sm={5} lg={7} className={classes.fieldInfo}>
          <div><Info />{`${helpTip}`}</div>
        </Grid>
      )}
    </Grid>
  );
};