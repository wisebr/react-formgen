import { Chip, Grid } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Info from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import React from 'react';

const FieldInfo = styled(Grid)({
  display: 'none',
  '& svg': {
    position: 'relative',
    top: 2,
    fontSize: 14,
    color: blueGrey[500],
    marginRight: 8
  }
});

const Field = styled(Grid)(({ theme }) => ({
  padding: 10,
  marginBottom: 15,
  '&:last-of-type': {
    marginBottom: 30,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    [`& ${FieldInfo}`]: {
      display: 'block'
    }
  }
}));

export interface ElementTipsWrapperProps {
  name: string;
  helpTip: string;
  renderName?: (name: string) => React.ReactNode;
  classes?: Partial<Record<'field' | 'fieldInfo' | 'variable', string>>;
}

export const ElementTipsWrapper: React.FC<ElementTipsWrapperProps> = ({
  classes, name, helpTip, children, renderName
}) => {
  return (
    <Field container spacing={2} className={classes?.field} alignItems="center">
      <Grid item sm={4} lg={3}>
        {children}
      </Grid>
      <FieldInfo item sm={3} lg={2} className={classes?.fieldInfo}>
        {renderName ? renderName(name) : (
          <Chip
            className={classNames(classes?.variable)}
            size="small"
            label={`${name}`}
            clickable
            color="primary"
            sx={{ cursor: 'default' }}
          />
        )}
      </FieldInfo>
      {!!helpTip && (
        <FieldInfo item sm={5} lg={7} className={classes?.fieldInfo}>
          <div><Info />{`${helpTip}`}</div>
        </FieldInfo>
      )}
    </Field>
  );
};
