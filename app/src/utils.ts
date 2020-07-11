import { ElementData, KeyPairsInputListElementProps, KEY_PAIRS_INPUT_LIST } from 'react-formgen';

export function generateElements (): ElementData[] {
  const keyPairsGroup: ElementData<KeyPairsInputListElementProps, string> = {
    id: '001',
    name: 'keyPairsGroup',
    label: 'Key pairs group',
    value: '',
    type: KEY_PAIRS_INPUT_LIST,
    order: 10,
    required: false,
    disabled: false,
    helpTip: 'a key pairs input group',
    props: {
      keys: ['attr1', 'attr2', 'attr3'],
      inputPropsMap: {
        attr1: {
          label: 'Attribute 1',
          selectLabel: 'Type',
          type: 'text',
          options: [{
            id: '1',
            value: 'value_a',
            label: 'Value A'
          }, {
            id: '2',
            value: 'value_b',
            label: 'Value B'
          }]
        },
        attr2: {
          label: 'Attribute 2',
          type: 'number',
          selectLabel: 'Type',
          options: [{
            id: '1',
            value: 'value_a',
            label: 'Value A'
          }, {
            id: '2',
            value: 'value_b',
            label: 'Value B'
          }]
        },
        attr3: {
          label: 'Attribute 3',
          valueFormat: 'custom:{0}'
        },
      }
    },
    settings: {},
    meta: {},
  };
  return [
    keyPairsGroup,
  ];
}