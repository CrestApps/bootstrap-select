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
after Bootstrap's JavaScript.**

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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.0/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.0/dist/js/bootstrap-select.min.js"></script>
```

You can replace `@1.1.0` with the version you want to consume. During
development, `@latest` also works, but a fixed version is safer for production
deployments.

When loaded via a `<script>` tag, the plugin exposes a global `Selectpicker`
class. Modern JavaScript can import the ES module entry:

```js
import Selectpicker from '@crestapps/bootstrap-select';
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

### Via JavaScript

Initialize an instance with the `Selectpicker` class. You can pass an element or
a CSS selector string:

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

See [Methods](docs/docs/methods.md) for the full list.

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

Standalone hosted examples are also available from the same site:

- `http://localhost:3000/examples/basic.html`
- `http://localhost:3000/examples/live-search.html`
- `http://localhost:3000/examples/multiple.html`

Other docs commands:

```sh
npm run docs:prepare # build plugin assets and copy them into docs/static/dist/
npm run docs:build   # build the static Docusaurus site into docs/build/
npm run docs:serve   # serve the built Docusaurus site locally
```

## Bugs and feature requests

Anyone and everyone is welcome to contribute. Please review the
[guidelines for contributing](CONTRIBUTING.md).

## Copyright and license

Copyright (C) 2012-2018 [SnapAppointments, LLC](https://snapappointments.com)
(original work). Fork modifications Copyright (C) CrestApps.

Licensed under [the MIT license](LICENSE).
