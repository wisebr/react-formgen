import React from 'react';
import KeyPairInput, { ExternalKeyPairInputProps } from './KeyPairInput';
import { BaseElementProps } from '../../types';
import { Typography } from '@material-ui/core';
import { makeStyles, DefaultTheme } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';

export const KEY_PAIRS_INPUT_LIST = 'KeyPairsInputList';

export interface KeyPairsInputListElementProps {
  keys: string[];
  inputPropsMap: {[key: string]: ExternalKeyPairInputProps};
}

export interface KeyPairsInputListProps extends BaseElementProps<string>, KeyPairsInputListElementProps {
  onChange?: (value: string) => void;
  inputRef?: React.Ref<any>;
}

const useStyles = makeStyles<DefaultTheme, KeyPairsInputListProps>(() => ({
  title: {
    color: ({error}) => error ? red[500] : 'inherit',
  }
}));

const KeyPairsInputList: React.FC<KeyPairsInputListProps> = (props) => {
  const {
    value, onChange, name, label, inputRef, disabled,
    // TODO: implement logic with required, scene,
    keys, inputPropsMap
  } = props;

  const classes = useStyles(props);

  const [valueMap, setValueMap] = React.useState<{[key: string]: string}>({});

  React.useEffect(() => {
    const pairs = value.split(',');
    const valMap = pairs.reduce<{[key: string]: string}>((obj, pair) => {
      if (pair) {
        const matches = pair.match(/^(.+?):(.*)$/);
        if (matches) {
          const [, key, val] = matches;
          obj[key] = val;
        }
      }
      return obj;
    }, {});
    setValueMap(keys.reduce((obj, key) => ({...obj, [key]: valMap[key] || ''}), {}));
  }, []);

  const change = React.useCallback((newValueMap: {[key: string]: string}) => {
    if (onChange) {
      const newValue = keys.map((key) => {
        let val = newValueMap[key];
        if (val) {
          const format = inputPropsMap[key]?.valueFormat;
          if (format) {
            val = format.replace('{0}', val);
          }
          return `${key}:${val}`;
        }
        return '';
      }).filter((pair) => !!pair).join(',');
      onChange(newValue);
    }
  }, [onChange, inputPropsMap]);

  const handleChangeInput = React.useCallback((val: string, key?: string) => {
    if (key) {
      const newValueMap = {...valueMap, [key]: val};
      setValueMap(newValueMap);
      change(newValueMap);
    }
  }, [valueMap]);

  return (
    <div>
      <Typography className={classes.title}>{label}</Typography>
      {keys.map((key) => (
        <KeyPairInput
          disabled={disabled}
          key={key}
          name={key}
          {...inputPropsMap[key]}
          value={valueMap[key]}
          onChange={handleChangeInput}
        />
      ))}
      <input type="hidden" ref={inputRef} name={name} />
    </div>
  );
};

export default React.memo(KeyPairsInputList);