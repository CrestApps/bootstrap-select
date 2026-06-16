<h1 align="center">bootstrap-select <sup>(CrestApps fork)</sup></h1>

<p align="center">
	<strong>A dependency-free, vanilla JavaScript plugin that brings select elements into the 21st century with intuitive multiselection, searching, and much more — for Bootstrap 5+.</strong>
</p>

<p align="center">
	<a href="https://github.com/CrestApps/crestapps-bootstrap-select/blob/main/LICENSE" target="_blank">
		<img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License">
	</a>
	<a href="https://www.npmjs.com/package/@crestapps/bootstrap-select" target="_blank">
		<img src="https://img.shields.io/npm/v/%40crestapps%2Fbootstrap-select.svg" alt="npm version">
	</a>
	<a href="https://bootstrap-select.crestapps.com" target="_blank">
		<img src="https://img.shields.io/badge/docs-bootstrap--select.crestapps.com-0a7bbb.svg" alt="Documentation">
	</a>
</p>

## About this fork

This project is a fork of the original [snapappointments/bootstrap-select](https://github.com/snapappointments/bootstrap-select).

The original `bootstrap-select` is an excellent, battle-tested plugin, but it
depends on **jQuery** and has not seen active maintenance for some time. Because
modern Bootstrap (v5+) dropped its jQuery dependency, and many projects are
moving away from jQuery entirely, we decided to create this fork with the
following goals:

- **Remove the jQuery dependency completely** — the library is now written in
  plain, vanilla JavaScript and ships with **no runtime dependencies** (other
  than Bootstrap itself).
- **Support Bootstrap 5 and later only** — older Bootstrap and jQuery
  compatibility paths are intentionally out of scope.
- Keep the select-enhancement feature set while prioritizing a modern, small,
  forward-only API.

## Requirements

- **Bootstrap 5+** (CSS and JS, including its bundled Popper). jQuery is **not**
  required.

## Quick start

Install with [npm](https://www.npmjs.com/package/@crestapps/bootstrap-select):

```sh
npm install @crestapps/bootstrap-select bootstrap
```

Load Bootstrap 5, then bootstrap-select's CSS and JS. **Load bootstrap-select
after Bootstrap's JavaScript** when using the browser-global build.

```html
<!-- Bootstrap 5 (includes Popper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- bootstrap-select -->
<link rel="stylesheet" href="dist/css/bootstrap-select.min.css">
<script src="dist/js/bootstrap-select.min.js"></script>

<!-- (Optional) translation files -->
<script src="dist/js/i18n/defaults-*.min.js"></script>
```

## Using the CDN build

After the package is published to npm, it will also be available through
jsDelivr. Prefer pinning an explicit package version in production:

```html
<!-- Bootstrap 5 (includes Popper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- @crestapps/bootstrap-select from jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.2/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.2/dist/js/bootstrap-select.min.js"></script>
```

You can replace `@1.1.2` with the version you want to consume. During
development, `@latest` also works, but a fixed version is safer for production
deployments.

## Package formats

The package now ships three first-class JavaScript entry styles from the same
source code:

| Style | Entry | Use when |
| --- | --- | --- |
| ESM | `@crestapps/bootstrap-select` via `import` | You use native modules or a bundler that prefers ESM |
| CommonJS | `@crestapps/bootstrap-select` via `require()` | You use a bundler or toolchain that still consumes CommonJS |
| Browser global / UMD | `dist/js/bootstrap-select.js` or `.min.js` | You load the plugin directly from a `<script>` tag or CDN |

**Important:** bootstrap-select is still a browser plugin. The ESM and
CommonJS builds are intended for browser bundles or browser-like runtimes with a
DOM, not server-only Node.js execution.

### ESM

```js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@crestapps/bootstrap-select/dist/css/bootstrap-select.css';
import Selectpicker, { Selectpicker as NamedSelectpicker } from '@crestapps/bootstrap-select';

const picker = new Selectpicker('#my-select', {
  liveSearch: true
});

console.log(Selectpicker === NamedSelectpicker); // true
```

The ESM build stays module-scoped; it does **not** add `window.Selectpicker`.

### CommonJS

```js
require('bootstrap');
require('@crestapps/bootstrap-select/dist/css/bootstrap-select.css');

const Selectpicker = require('@crestapps/bootstrap-select');
// or: const { Selectpicker } = require('@crestapps/bootstrap-select');

const picker = new Selectpicker('#my-select', {
  liveSearch: true
});
```

The CommonJS entry exports the class as:

- `module.exports = Selectpicker`
- `module.exports.Selectpicker = Selectpicker`
- `module.exports.default = Selectpicker`

Like the ESM build, the CommonJS build stays module-scoped and does **not** add
`window.Selectpicker`.

### Browser global / CDN

When loaded via a `<script>` tag, the UMD build exposes a global
`window.Selectpicker` / `Selectpicker`:

```html
<!-- Bootstrap 5 (includes Popper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- @crestapps/bootstrap-select from jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.2/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.2/dist/js/bootstrap-select.min.js"></script>

<script>
  const picker = new Selectpicker('#my-select', {
    liveSearch: true
  });
</script>
```

## Usage

### Via the `selectpicker` class (automatic)

Add the `selectpicker` class to your `<select>` elements. They are
automatically initialized once the DOM is ready — no JavaScript required.

```html
<select class="selectpicker">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Barbecue</option>
</select>
```

Existing bootstrap-select markup that uses `title="..."` placeholders or
`data-width="fit"` is also supported:

```html
<select class="selectpicker" title="Content Type" data-width="fit">
  <option>Article</option>
  <option>Blog Post</option>
</select>
```

### Via JavaScript

Initialize an instance with the `Selectpicker` class from your chosen module
style. You can pass an element or a CSS selector string:

```js
// Initialize a single select
const picker = new Selectpicker('#my-select', {
  liveSearch: true,
  size: 8
});

// Or reuse an existing instance / create one if needed
const picker2 = Selectpicker.getOrCreateInstance(document.querySelector('#my-select'));
```

To initialize several elements at once, loop over them:

```js
document.querySelectorAll('.my-select').forEach(function (el) {
  new Selectpicker(el);
});
```

### Calling methods

Methods are called directly on the instance:

```js
const picker = Selectpicker.getInstance('#my-select');

picker.val('Cheese');     // set the value
picker.refresh();         // re-render after changing the underlying <select>
picker.selectAll();       // (multiple selects)
picker.destroy();         // remove the plugin and restore the original <select>
```

See [Methods](docs/content/methods.md) for the full list.

### Events

Events are dispatched as native `CustomEvent`s on the original `<select>`
element (named exactly like the original `*.bs.select` events) and can be
listened for with `addEventListener`:

```js
const select = document.querySelector('#my-select');

select.addEventListener('changed.bs.select', function (e) {
  // e.detail = { clickedIndex, isSelected, previousValue }
  console.log('value changed', e.detail);
});

select.addEventListener('show.bs.select', function (e) {
  // e.detail.bsEvent is the original Bootstrap dropdown event
  console.log('opening from', e.detail.bsEvent.relatedTarget);
});

select.addEventListener('loaded.bs.select', function () { /* ... */ });
```

Available events: `loaded`, `rendered`, `refreshed`, `changed`, `show`,
`shown`, `hide`, `hidden`, `maxReached`, `maxReachedGrp`, `fetched` — each
suffixed with `.bs.select`.

## Documentation

Full documentation is hosted at
**[bootstrap-select.crestapps.com](https://bootstrap-select.crestapps.com)**,
including [Getting Started](https://bootstrap-select.crestapps.com/docs/),
[Examples](https://bootstrap-select.crestapps.com/docs/examples),
[Options](https://bootstrap-select.crestapps.com/docs/options), and
[Methods](https://bootstrap-select.crestapps.com/docs/methods).

## Building and testing

```sh
# Requires Node.js 20.19 or newer for the development toolchain.
npm install
npm run build   # grunt build (lint + compile JS and CSS into dist/)
npm run lint    # grunt lint
npm test        # Playwright end-to-end tests
```

## Documentation site

The documentation site is built with **Docusaurus 3.10** and uses the CrestApps
theme colors. It is published to
[bootstrap-select.crestapps.com](https://bootstrap-select.crestapps.com) via
GitHub Pages whenever changes land on `main`.

Run the site locally:

```sh
npm install
npm run docs:start
```

`docs:start` builds the plugin, copies the local `dist/` files into
`docs/static/dist/`, and starts Docusaurus. Open `http://localhost:3000/`, then
use the **Examples** page to exercise the plugin in the docs site.

The Docusaurus source lives under `docs/content/`. Because GitHub Pages is
configured to publish from `main:/docs`, the deploy workflow builds the site
and syncs the generated static files back into `docs/`.

Standalone hosted examples are also available from the same site:

- `http://localhost:3000/examples/basic.html`
- `http://localhost:3000/examples/live-search.html`
- `http://localhost:3000/examples/multiple.html`

Other docs commands:

```sh
npm run docs:prepare # build plugin assets and copy them into docs/static/dist/
npm run docs:build   # build the static Docusaurus site into docs/.pages-build/
npm run docs:pages   # copy the built site into docs/ for branch-based Pages
npm run docs:serve   # serve the built Docusaurus site locally
```

## Bugs and feature requests

Anyone and everyone is welcome to contribute. Please review the
[guidelines for contributing](CONTRIBUTING.md).

## Copyright and license

Copyright (C) 2012-2018 [SnapAppointments, LLC](https://snapappointments.com)
(original work). Fork modifications Copyright (C) CrestApps.

Licensed under [the MIT license](LICENSE).
