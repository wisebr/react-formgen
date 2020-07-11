import React from 'react';
import { TextField, TextFieldProps, MenuItem } from '@material-ui/core';
import { SelectOption } from '../../types';
import { makeStyles } from '@material-ui/styles';

export interface ExternalKeyPairInputProps {
  label?: string;
  type?: TextFieldProps['type'];
  valueFormat?: string;
  selectLabel?: string;
  options?: SelectOption[];
}

export interface KeyPairInputProps extends ExternalKeyPairInputProps {
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string; // 'selected:input'
  onChange?: (val: string, name?: string) => void;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap'
  },
  valueInput: {
    minWidth: 180,
  },
  select: {
    minWidth: 120,
  },
}));

const KeyPairInput: React.FC<KeyPairInputProps> = ({
  name, label, selectLabel, type, value = '', onChange, options, disabled, required
}) => {
  const classes = useStyles();
  const [selected, input] = React.useMemo(() => {
    const res = value.split(':');
    return res.length > 1 ? res : ['', res[0]];
  }, [value]);

  const handleChangeValue = React.useCallback(({target: {value: val}}: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(val ? `${selected ? selected + ':' : ''}${val}` : '', name);
    }
  }, [onChange, name]);

  const handleChangeSelected = React.useCallback(({target: {value: val}}: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(val ? `${val + ':'}${input}` : input, name);
    }
  }, [onChange, name]);

  return (
    <div className={classes.root}>
      <TextField
        className={classes.valueInput}
        label={label || name}
        type={type}
        disabled={disabled}
        required={required}
        value={input}
        onChange={handleChangeValue}
      />
      {!!options && (
        <TextField
          className={classes.select}
          select
          label={selectLabel}
          disabled={disabled}
          value={selected}
          onChange={handleChangeSelected}
        >
          {options.map((opt) => (
            <MenuItem key={opt.id} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </div>
  );
};

export default React.memo(KeyPairInput);