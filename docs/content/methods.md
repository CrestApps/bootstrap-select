---
sidebar_position: 4
title: Methods
description: bootstrap-select instance and static methods.
---

# Methods

Interface with bootstrap-select.

In this fork, methods are called directly on the `Selectpicker` instance (there
is no jQuery `$.fn.selectpicker`). Obtain an instance with
`Selectpicker.getInstance(elementOrSelector)` (returns the existing instance) or
`Selectpicker.getOrCreateInstance(elementOrSelector, options)`.

```js
const picker = Selectpicker.getInstance('#my-select');
```

---

#### `.val()`

You can set the selected value by calling the `val` method on the instance.

```js
Selectpicker.getInstance('#my-select').val('Mustard');
Selectpicker.getInstance('#my-select').val(['Mustard', 'Relish']);
```

This is different to setting `value` directly on the `select` element. If you set
`value` on the element directly, the bootstrap-select UI will not refresh (as the
change event only fires from user interaction). You will have to call the UI
render method yourself.

```js
const select = document.querySelector('#my-select');
select.value = 'Mustard';
Selectpicker.getInstance(select).render();

// this is the equivalent of the above
Selectpicker.getInstance(select).val('Mustard');
```

Called with no argument, `val()` returns the current value (a string for single
selects, or an array of strings for multiple selects).

---

#### `.selectAll()`

This will select all items in a multi-select.

```js
Selectpicker.getInstance('#my-select').selectAll();
```

---

#### `.deselectAll()`

This will deselect all items in a multi-select.

```js
Selectpicker.getInstance('#my-select').deselectAll();
```

---

#### `.render()`

You can force a re-render of the bootstrap-select UI with the `render` method.
This is useful if you programmatically change any underlying values that affect
the layout of the element.

```js
Selectpicker.getInstance('#my-select').render();
```

---

#### `.mobile()`

Enable mobile scrolling by calling `mobile()`. This enables the device's native
menu for select menus.

The method for detecting the browser is left up to the user.

```js
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
  Selectpicker.getInstance('#my-select').mobile();
}
```

---

#### `.setStyle()`

Modify the class(es) associated with either the button itself or its container.

If changing the class on the container:

```js
const select = document.querySelector('#my-select');
select.closest('.bootstrap-select').classList.add('col-lg-12');
Selectpicker.getInstance(select).setStyle();
```

If changing the class(es) on the button (altering `data-style`):

```js
const picker = Selectpicker.getInstance('#my-select');

// Replace class
picker.setStyle('btn-danger');

// Add class
picker.setStyle('btn-lg', 'add');

// Remove class
picker.setStyle('btn-lg', 'remove');
```

---

#### `.refresh()`

To programmatically update a select with JavaScript, first manipulate the select,
then use the `refresh` method to update the UI to match the new state. This is
necessary when removing or adding options, or when disabling/enabling a select
via JavaScript.

```js
Selectpicker.getInstance('#my-select').refresh();
```

For example, to remove an option then refresh:

```js
document.querySelector('.rm-mustard').addEventListener('click', function () {
  const select = document.querySelector('.remove-example');
  const option = select.querySelector('[value="Mustard"]');
  if (option) option.remove();
  Selectpicker.getInstance(select).refresh();
});
```

Or to disable/enable a select:

```js
const select = document.querySelector('.disable-example');

document.querySelector('.ex-disable').addEventListener('click', function () {
  select.disabled = true;
  Selectpicker.getInstance(select).refresh();
});

document.querySelector('.ex-enable').addEventListener('click', function () {
  select.disabled = false;
  Selectpicker.getInstance(select).refresh();
});
```

---

#### `.toggle()`

Programmatically toggles the bootstrap-select menu open/closed.

```js
Selectpicker.getInstance('#my-select').toggle();
```

`.open()` and `.close()` are also available.

---

#### `.hide()`

To programmatically hide the bootstrap-select use the `hide` method (this only
affects the visibility of the bootstrap-select itself).

```js
Selectpicker.getInstance('#my-select').hide();
```

---

#### `.show()`

To programmatically show the bootstrap-select use the `show` method (this only
affects the visibility of the bootstrap-select itself).

```js
Selectpicker.getInstance('#my-select').show();
```

---

#### `.destroy()`

To programmatically destroy the bootstrap-select, use the `destroy` method. This
removes the generated UI and restores the original `<select>` element.

```js
Selectpicker.getInstance('#my-select').destroy();
```

---

## Static methods

| Method | Description |
| --- | --- |
| `new Selectpicker(elementOrSelector, options)` | Create a new instance. |
| `Selectpicker.getInstance(elementOrSelector)` | Return the existing instance for an element, or `null`. |
| `Selectpicker.getOrCreateInstance(elementOrSelector, options)` | Return the existing instance, creating one if needed. |
| `Selectpicker.setDefaults(options)` | Set global default options (used by the i18n translation files). |
| `Selectpicker.VERSION` | The plugin version. |
