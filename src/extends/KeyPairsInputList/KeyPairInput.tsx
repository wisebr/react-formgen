import React from 'react';
import { TextField, TextFieldProps, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectOption } from '../../types';

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

const Root = styled('div')({
  display: 'flex',
  flexWrap: 'nowrap'
});

const ValueInput = styled(TextField)({
  minWidth: 180,
});

const SelectInput = styled(TextField)({
  minWidth: 120,
});

const KeyPairInput: React.FC<KeyPairInputProps> = ({
  name, label, selectLabel, type, value = '', onChange, options, disabled, required
}) => {
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
    <Root>
      <ValueInput
        label={label || name}
        type={type}
        disabled={disabled}
        required={required}
        value={input}
        onChange={handleChangeValue}
      />
      {!!options && (
        <SelectInput
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
        </SelectInput>
      )}
    </Root>
  );
};

export default React.memo(KeyPairInput);
