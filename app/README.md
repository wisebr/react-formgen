### Development

```bash
# build react-formgen and link to app at first
cd ..
npm i
npm run build
npm link

# make link for react-formgen lib to avoid importing react and @material-ui twice
# react may cause invalid hook errors
# @material-ui may cause styles errors
npm link ./app/node_modules/react ./app/node_modules/@mui/material ./app/node_modules/@mui/styles

# then link lib to app and start
cd app
npm link react-formgen
npm start
```