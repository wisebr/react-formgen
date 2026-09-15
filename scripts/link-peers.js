/**
 * Point the library's copies of shared peers at the demo app's node_modules.
 * `npm i` in this package reinstalls its own react / MUI; webpack then sees two
 * Reacts and blows up with invalid hook / useReducer of null. Re-run after every install.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const appNm = path.join(root, 'app', 'node_modules');
const libNm = path.join(root, 'node_modules');

const peers = [
  'react',
  'react-dom',
  '@mui/material',
  '@emotion/react',
  '@emotion/styled',
];

if (!fs.existsSync(appNm)) {
  console.warn('[link:peers] skip: app/node_modules not found');
  process.exit(0);
}

for (const pkg of peers) {
  const target = path.join(appNm, pkg);
  const dest = path.join(libNm, pkg);
  if (!fs.existsSync(target)) {
    console.warn(`[link:peers] skip ${pkg}: ${target} missing`);
    continue;
  }
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.symlinkSync(target, dest);
  console.log(`[link:peers] ${pkg} -> ${target}`);
}
