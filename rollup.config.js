import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';

const EXTERNAL = [
  'react',
  'react-dom',
  'react-hook-form',
  'react-dnd',
  'react-dnd-html5-backend',
  'classnames',
  'dayjs',
  'shortid',
  '@mui/material',
  '@mui/icons-material',
  '@mui/x-date-pickers',
  '@emotion/react',
  '@emotion/styled',
];
const isExternal = (id) => EXTERNAL.some((dep) => id === dep || id.startsWith(`${dep}/`));

export function getConfig({
  tsconfig = './tsconfig.json',
  input = 'src/index.ts',
  output = [
    {
      file: `dist/${pkg.name}.js`,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: `dist/${pkg.name}.es.js`,
      format: 'esm',
    },
  ],
}) {
  return {
    input,
    output,
    external: isExternal,
    plugins: [
      json(),
      typescript({
        tsconfig,
        clean: true,
      }),
      visualizer(),
    ],
  };
}

export default getConfig({});
