# Documentation site development

This repository ships the public docs site at
[bootstrap-select.crestapps.com](https://bootstrap-select.crestapps.com) using
**Docusaurus 3.10**.

## Requirements

- Node.js 20.19 or newer

## Build the package first

Most docs workflows depend on the generated plugin assets being available under
`docs/static/dist/`.

```sh
npm install
npm run build
```

## Run the docs site locally

The easiest local workflow is:

```sh
npm install
npm run docs:start
```

`docs:start`:

1. builds the plugin into `dist/`
2. copies the generated assets into `docs/static/dist/`
3. starts the Docusaurus dev server

Open `http://localhost:3000/` after startup. The examples are available from
the docs UI and directly at:

- `http://localhost:3000/examples/basic.html`
- `http://localhost:3000/examples/live-search.html`
- `http://localhost:3000/examples/multiple.html`

## Other documentation commands

```sh
npm run docs:prepare # build plugin assets and copy them into docs/static/dist/
npm run docs:build   # build the static Docusaurus site into .pages-build/
npm run docs:serve   # serve the built Docusaurus site locally
npm run docs:pages   # copy the built site into docs/ for branch-based Pages
npm run docs:clear   # clear Docusaurus caches
```

## Docs source layout

- `docs/content/` - current Docusaurus source content
- `docs/src/` - Docusaurus theme components
- `docs/static/` - static assets copied directly into the site
- `docs/versioned_docs/` - versioned documentation snapshots

GitHub Pages publishes from the repository's `docs/` output, so the deploy
workflow builds the site and syncs the generated static files back into this
directory.
