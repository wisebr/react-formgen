### Development

`npm i` in the library reinstalls its own `react` / `@mui`. Webpack then sees two copies and you get `Invalid hook call` / `Cannot read properties of null (reading 'useReducer')`. `postinstall` re-links those peers to `app/node_modules`. Restart `npm start` after installing.

```bash
# build react-formgen and link to app at first
cd ..
npm i
npm run build
npm link

# then link lib to app and start
cd app
npm i
npm link react-formgen
cd ..
npm start
```

If the invalid-hook error comes back after a reinstall, run `npm run link:peers` in the library root and restart the demo.