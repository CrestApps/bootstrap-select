<h1 align="center">bootstrap-select <sup>(CrestApps fork)</sup></h1>

<p align="center">
	<strong>A dependency-free, vanilla JavaScript plugin that brings select elements into the 21st century with intuitive multiselection, searching, and much more — for Bootstrap 5+.</strong>
</p>

<p align="center">
	<a href="https://github.com/CrestApps/bootstrap-select/blob/main/LICENSE" target="_blank">
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
- **Ship modern distribution formats** — the package includes first-class ESM,
  CommonJS, and browser-global UMD builds from the same source code.
- **Use a modern build pipeline** — the fork no longer relies on Grunt or Less;
  builds are produced with Rollup, Sass, and the current docs/tooling stack.
- Keep the select-enhancement feature set while prioritizing a modern, small,
  forward-only API.

## Requirements

- **Bootstrap 5+** (CSS and JS, including its bundled Popper).

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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/js/bootstrap-select.min.js"></script>
```

You can replace `@1.2.0` with the version you want to consume. During
development, `@latest` also works, but a fixed version is safer for production
deployments.

## Package formats

The package now ships three first-class JavaScript entry styles from the same
source code:

| Style | Package entry | Direct file | Use when |
| --- | --- | --- | --- |
| ESM | `import Selectpicker from '@crestapps/bootstrap-select'` | `dist/js/bootstrap-select.esm.mjs` | You use native modules or a bundler that prefers ESM |
| CommonJS | `require('@crestapps/bootstrap-select')` | `dist/js/bootstrap-select.cjs` | You use a bundler or toolchain that still consumes CommonJS |
| Browser global / UMD | n/a | `dist/js/bootstrap-select.js` or `.min.js` | You load the plugin directly from a `<script>` tag or CDN |

**Important:** bootstrap-select is still a browser plugin. The ESM and
CommonJS builds are intended for browser bundles or browser-like runtimes with a
DOM, not server-only Node.js execution.

### ESM

Use the package `import` entry or the direct `.mjs` file:

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
If you prefer a direct file import, use `@crestapps/bootstrap-select/dist/js/bootstrap-select.esm.mjs`.

### CommonJS

Use the package `require()` entry or the direct `.cjs` file:

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
If you prefer a direct file require, use `@crestapps/bootstrap-select/dist/js/bootstrap-select.cjs`.

### Browser global / UMD

When loaded via a `<script>` tag, the UMD build exposes a global
`window.Selectpicker` / `Selectpicker`:

```html
<!-- Bootstrap 5 (includes Popper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- @crestapps/bootstrap-select from jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/js/bootstrap-select.min.js"></script>

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

#### Selection indicators

For single selects, use `show-tick` for the default checkmark, or set
`data-selection-indicator="checkbox"` to render radio-style indicators
automatically. On multiselects, `data-selection-indicator="checkbox"` renders a
checkbox column.

```html
<select class="selectpicker show-tick">
  <option>Article</option>
  <option selected>Blog Post</option>
</select>

<select class="selectpicker" data-selection-indicator="checkbox">
  <option>Article</option>
  <option selected>Blog Post</option>
</select>

<select class="selectpicker" multiple data-selection-indicator="checkbox">
  <option selected>Bootstrap 5</option>
  <option>Vue</option>
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

### Sanitizing custom HTML

`data-content` HTML is sanitized by bootstrap-select's built-in zero-dependency sanitizer by default.

If you prefer a dedicated sanitizer such as [DOMPurify](https://github.com/cure53/DOMPurify), keep `sanitize: true` and provide a `sanitizeFn`. The hook receives an array of DOM nodes, so sanitize each node in place:

```js
import DOMPurify from 'dompurify';

new Selectpicker('#my-select', {
  sanitize: true,
  sanitizeFn: function (domNodes) {
    domNodes.forEach(function (node) {
      node.innerHTML = DOMPurify.sanitize(node.innerHTML);
    });
  }
});
```

This keeps the library dependency-free by default while letting applications opt into a library-backed sanitizer when they need one.

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
[Methods](https://bootstrap-select.crestapps.com/docs/methods), and
[Events](https://bootstrap-select.crestapps.com/docs/events).

## Building locally

To work with the package from source, install dependencies and build `dist/`:

```sh
# Requires Node.js 20.19 or newer for the development toolchain.
npm install
npm run build
```

Useful local workflows:

```sh
npm run lint
npm test
```

For documentation site commands and local Docusaurus setup, see
[`docs/README.md`](docs/README.md).

## Bugs and feature requests

Anyone and everyone is welcome to contribute. Please review the
[guidelines for contributing](CONTRIBUTING.md).

## Copyright and license

Copyright (C) 2012-2018 [SnapAppointments, LLC](https://snapappointments.com)
(original work). Fork modifications Copyright (C) CrestApps.

Licensed under [the MIT license](LICENSE).
