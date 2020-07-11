import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';

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
    external: ['react', 'react-dom', '@material-ui/icons', '@material-ui/core', '@material-ui/styles'],
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
