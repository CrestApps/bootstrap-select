---
sidebar_position: 1
title: Getting Started
description: Install and use the CrestApps bootstrap-select fork with Bootstrap 5+.
---

# Getting Started

:::info CrestApps fork
This is the CrestApps fork of [snapappointments/bootstrap-select](https://github.com/snapappointments/bootstrap-select). It removes the jQuery dependency entirely, uses plain vanilla JavaScript, and supports Bootstrap 5+ only. Older Bootstrap and jQuery compatibility paths are intentionally out of scope so the library can stay small and forward-focused.
:::

## Quick start

bootstrap-select requires **Bootstrap 5+** (CSS and JS, including its bundled Popper).
jQuery is **not** required.

Install with [npm](https://www.npmjs.com/package/@crestapps/bootstrap-select):

```sh
npm install @crestapps/bootstrap-select bootstrap
```

Load Bootstrap 5 first, then bootstrap-select's CSS and JS (after Bootstrap's JavaScript when using the browser-global build):

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

After the package is published to npm, it will also be available through jsDelivr.
Prefer pinning an explicit package version in production:

```html
<!-- Bootstrap 5 (includes Popper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- @crestapps/bootstrap-select from jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/js/bootstrap-select.min.js"></script>
```

You can replace `@1.2.0` with the version you want to consume. During development,
`@latest` also works, but a fixed version is safer for production deployments.

## Package formats

bootstrap-select now ships three JavaScript consumption styles from the same
shared source code:

| Style | Package entry | Direct file | Use when |
| --- | --- | --- | --- |
| ESM | `import Selectpicker from '@crestapps/bootstrap-select'` | `dist/js/bootstrap-select.esm.mjs` | Your app uses native modules or an ESM-first bundler |
| CommonJS | `require('@crestapps/bootstrap-select')` | `dist/js/bootstrap-select.cjs` | Your bundler or app still prefers CommonJS |
| Browser global / UMD | n/a | `dist/js/bootstrap-select.js` or `.min.js` | You load the plugin directly from a `<script>` tag or CDN |

bootstrap-select is still a browser plugin, so the ESM and CommonJS entries are
meant for browser bundles or browser-like runtimes with a DOM, not server-only
Node.js execution.

### ESM

Use the package `import` entry or the direct `.mjs` file:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@crestapps/bootstrap-select/dist/css/bootstrap-select.css';
import Selectpicker, { Selectpicker as NamedSelectpicker } from '@crestapps/bootstrap-select';

const picker = new Selectpicker('#my-select', { liveSearch: true });

console.log(Selectpicker === NamedSelectpicker); // true
```

The ESM build stays module-scoped and does **not** attach `window.Selectpicker`.
If you prefer a direct file import, use `@crestapps/bootstrap-select/dist/js/bootstrap-select.esm.mjs`.

### CommonJS

Use the package `require()` entry or the direct `.cjs` file:

```js
require('bootstrap');
require('@crestapps/bootstrap-select/dist/css/bootstrap-select.css');

const Selectpicker = require('@crestapps/bootstrap-select');
// or: const { Selectpicker } = require('@crestapps/bootstrap-select');

const picker = new Selectpicker('#my-select', { liveSearch: true });
```

The CommonJS entry exports:

- `module.exports = Selectpicker`
- `module.exports.Selectpicker = Selectpicker`
- `module.exports.default = Selectpicker`

Like the ESM build, it does **not** attach `window.Selectpicker`.
If you prefer a direct file require, use `@crestapps/bootstrap-select/dist/js/bootstrap-select.cjs`.

### Browser global / UMD

When loaded from a `<script>` tag, the UMD build exposes the global
`window.Selectpicker` / `Selectpicker`:

```html
<!-- Bootstrap 5 (includes Popper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- @crestapps/bootstrap-select from jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.2.0/dist/js/bootstrap-select.min.js"></script>

<script>
  const picker = new Selectpicker('#my-select', { liveSearch: true });
</script>
```

# Usage

---

### Via `selectpicker` class
Add the `selectpicker` class to your select elements to auto-initialize bootstrap-select
once the DOM is ready.
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
```js
// Initialize one select (accepts an element or a selector string)
new Selectpicker('#my-select', { liveSearch: true });
```
or
```js
// Initialize several selects
document.querySelectorAll('.my-select').forEach(function (el) {
  new Selectpicker(el);
});
```

If calling bootstrap-select via JavaScript, run your code after the elements exist —
either place the script at the bottom of the page (after the last `<select>`) or wrap
it in a `DOMContentLoaded` listener:

```js
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('select').forEach(function (el) {
    new Selectpicker(el);
  });
});
```
