### Development

```bash
# build react-formgen and link to app at first
cd ..
npm i
npm run build
npm link
# avoid importing react and @material-ui twice
mv ./node_modules/react ./node_modules/react_bak
mv ./node_modules/@material-ui ./node_modules/@material-ui_bak
cd app
npm link react-formgen
npm start
```