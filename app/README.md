### Development

```bash
# build react-formgen and link to app at first
cd ..
npm i
npm run build
npm link

# make link for react-formgen lib to avoid importing react and @mui twice
# react may cause invalid hook errors
# @mui may cause styles errors
npm link ./app/node_modules/react ./app/node_modules/@mui/material ./app/node_modules/@emotion/react ./app/node_modules/@emotion/styled

# then link lib to app and start
cd app
npm link react-formgen
npm start
```