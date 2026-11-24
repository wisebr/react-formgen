import { Chip, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import Info from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import React from 'react';

const Field = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(1),
  },
}));

const FieldContent = styled('div')({
  display: 'contents',
  '& .MuiFormControl-root': {
    marginRight: 0,
  },
});

const TipContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  maxWidth: 360,
  padding: theme.spacing(0.5),
}));

const HelpTip = styled('div')({
  lineHeight: 1.5,
  overflowWrap: 'anywhere',
});

const TipIcon = styled(Info)({
  flexShrink: 0,
  fontSize: 18,
  color: grey[400],
  cursor: 'default',
});

export interface ElementTipsWrapperProps {
  name: string;
  helpTip: string;
  children?: React.ReactNode;
  renderName?: (name: string) => React.ReactNode;
  classes?: Partial<Record<'field' | 'fieldInfo' | 'variable', string>>;
}

export const ElementTipsWrapper: React.FC<ElementTipsWrapperProps> = ({
  classes,
  name,
  helpTip,
  children,
  renderName,
}) => {
  return (
    <Field className={classes?.field}>
      <FieldContent>{children}</FieldContent>
      <Tooltip
        arrow
        placement="top"
        title={
          <TipContent>
            {renderName ? (
              renderName(name)
            ) : (
              <Chip
                className={classNames(classes?.variable)}
                size="small"
                label={`${name}`}
                clickable
                color="primary"
                sx={{ cursor: 'default' }}
              />
            )}
            {!!helpTip && <HelpTip>{helpTip}</HelpTip>}
          </TipContent>
        }>
        <TipIcon
          aria-label={name}
          className={classNames('formgen-field-info', classes?.fieldInfo)}
          tabIndex={0}
        />
      </Tooltip>
    </Field>
  );
};
