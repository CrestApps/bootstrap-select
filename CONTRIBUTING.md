# Contributing to crestapps-bootstrap-select

Thanks for contributing. This repository contains the vanilla JavaScript
CrestApps fork of `bootstrap-select`, the built distribution artifacts, the
Docusaurus docs site, and the Playwright/manual test assets used to verify
changes.

## Project layout

- `js/` - source for the plugin runtime
- `less/` and `sass/` - source stylesheets
- `dist/` - generated distributable assets
- `docs/` - Docusaurus docs app and hosted standalone examples
- `tests/` - manual HTML fixtures, helpers, and Playwright e2e coverage

Edit the source files in `js/`, `less/`, `sass/`, or `docs/`. Do not hand-edit
generated files in `dist/`.

## Before you start

1. Search existing issues and pull requests before opening a new one.
2. For non-trivial changes, open or reference an issue first so the scope is
   clear before implementation starts.
3. For bugs, include the browser, OS, Bootstrap version, and
   `crestapps-bootstrap-select` version you tested against.

## Local setup

1. Install Node.js 20.19 or newer.
2. Install dependencies from the repository root:

   ```sh
   npm install
   ```

3. Use the root `package.json` scripts for day-to-day work:

   ```sh
   npm run build
   npm run lint
   npm test
   npm run docs:start
   ```

## Build and validation workflow

The project uses Grunt for asset generation and Docusaurus for the docs site.

- `npm run build` - rebuilds `dist/` from the source files
- `npm run lint` - runs the configured ESLint checks
- `npm test` - runs the Playwright suite
- `npm run docs:prepare` - builds the plugin and copies docs assets into
  `docs/static/dist/`
- `npm run docs:start` - prepares the docs assets and starts the local docs site
- `npm run docs:build` - creates a production docs build under `docs/build/`

If you prefer Grunt directly, these tasks remain available:

- `grunt build-css`
- `grunt build-js`
- `grunt copy-docs`
- `grunt dev-watch`

## Working on docs

The docs app lives under `docs/` and serves both the documentation pages and
the standalone hosted examples under `/examples/`.

1. Run `npm run docs:start` from the repository root.
2. Open `http://localhost:3000/`.
3. Check both the homepage and docs pages when changing branding or theme CSS.
4. If you change plugin output used by the docs examples, rerun
   `npm run docs:prepare` or restart `docs:start`.

## Tests and repros

- Use the Playwright specs in `tests/e2e/` for browser-level coverage.
- Manual verification pages live in `tests/bootstrap5.html` and `tests/index.html`.
- The standalone docs examples in `docs/static/examples/` are useful for reduced
  repros and smoke tests.

When possible, add or update automated coverage for bug fixes and behavior
changes.

## Pull request guidelines

1. Branch from `main` and target `main` unless maintainers ask for something
   else.
2. Keep changes focused and avoid mixing unrelated work in one PR.
3. Update docs when the public API, setup, or behavior changes.
4. Include validation notes in the PR description, especially for docs, build,
   and browser changes.
5. Write a clear summary of the problem, the fix, and any follow-up work.

By contributing code to this repository, you agree that your contribution may be
distributed under the project's current license.
