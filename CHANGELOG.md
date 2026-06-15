# v1.1.0 (CrestApps fork)

### Highlights

- Added release-time docs versioning for `major.minor` releases so published docs
  snapshots remain selectable after future updates.
- Fixed Font Awesome loading in the Docusaurus site by bundling the CSS and
  webfonts with the docs build.
- Expanded the docs examples page with a dedicated list-style selected-items
  example.

# v1.0.1 (CrestApps fork)

This is the first release of the CrestApps fork of
[snapappointments/bootstrap-select](https://github.com/snapappointments/bootstrap-select).

### Breaking changes

- **Removed the jQuery dependency.** The plugin is now written in plain, vanilla
  JavaScript and has no runtime dependencies other than Bootstrap.
- **Dropped Bootstrap 3 and Bootstrap 4 support.** Only Bootstrap 5+ is supported.
- **New public API** (since `$.fn.selectpicker` no longer exists):
  - Initialize with `new Selectpicker(elementOrSelector, options)`, or add the
    `selectpicker` class for automatic initialization.
  - `Selectpicker.getInstance(el)` / `Selectpicker.getOrCreateInstance(el, options)`
    replace retrieving the plugin data.
  - Instance methods are called directly, e.g. `instance.val('x')`,
    `instance.refresh()`, `instance.destroy()`.
  - Global defaults are set with `Selectpicker.setDefaults({ … })` (used by the
    i18n translation files).
  - Events are dispatched as native `CustomEvent`s on the `<select>` element and
    consumed with `addEventListener('changed.bs.select', …)`. The `changed`
    event's arguments are provided via `event.detail`
    (`{ clickedIndex, isSelected, previousValue }`).
- Removed legacy browser polyfills (classList, `String.prototype.startsWith`,
  `Object.values`, jQuery `valHooks`, etc.).

### Other changes

- Test suite migrated from Cypress to Playwright.
- Options, data attributes, and behavior are otherwise unchanged from the
  original to keep migration straightforward.
