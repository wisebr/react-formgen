# react-formgen

Form generator and renderer built on React, MUI and react-hook-form.

## Requirements

All of the following are peer dependencies and must be installed by the host application:

| Package | Version |
| --- | --- |
| `react` / `react-dom` | `^18.3.1 \|\| ^19.0.0` |
| `@mui/material` | `^7.3.11 \|\| ^9.5.0` |
| `@mui/icons-material` | `^7.3.11 \|\| ^9.5.0` |
| `@mui/x-date-pickers` | `^8.0.0 \|\| ^9.0.0` |
| `@emotion/react` / `@emotion/styled` | `^11.11.0` |
| `react-hook-form` | `^7.53.0` |
| `react-dnd` / `react-dnd-html5-backend` | `^16.0.1` |

`react-dnd` **must** be v16. The built-in drag source uses the v16 spec shape
(`type` on the hook spec instead of inside `item`); v10 silently breaks dragging.

## ESM only

Since v2 this package ships a single ESM bundle:

- `dist/react-formgen.mjs`
- `dist/index.d.ts`

Consume it through a bundler (Vite, webpack 5, Rollup) or any ESM runtime.
Node's `require()` is not supported, because `react-dnd@16` is ESM-only and a
CommonJS build of this package could not load it.

## Breaking changes in v2

- Dropped the CommonJS build; the package is ESM-only.
- `react` peer range widened to `^18.3.1 || ^19.0.0` (built and tested on React 19).
- MUI peer range widened to `^7.3.11 || ^9.5.0` (built and tested on MUI 9.5).
- `react-dnd` peer tightened from `^10` to `^16.0.1`.

## Development

Developing as thirdparty refers to [app docs](./app/README.md)
