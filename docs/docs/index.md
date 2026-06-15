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

Load Bootstrap 5 first, then bootstrap-select's CSS and JS (after Bootstrap's JavaScript):

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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.0/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/@crestapps/bootstrap-select@1.1.0/dist/js/bootstrap-select.min.js"></script>
```

You can replace `@1.1.0` with the version you want to consume. During development,
`@latest` also works, but a fixed version is safer for production deployments.

When loaded via a `<script>` tag, the plugin exposes a global `Selectpicker` class.
Modern JavaScript can import the ES module entry:

```js
import Selectpicker from '@crestapps/bootstrap-select';
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

## Tags-style editor pattern

For taxonomy-style experiences, combine live search, removable selected tags, and open-option creation so selections stay visible as tags without repeating the full list in the button:

```js
new Selectpicker('#tag-editor', {
  liveSearch: true,
  showSelectedTags: true,
  openOptions: true,
  selectionIndicator: 'checkbox'
});
```

See **Examples** for a live demo and **Options** for the full `source.create(callback, searchValue)` flow used by remote-backed editors.
