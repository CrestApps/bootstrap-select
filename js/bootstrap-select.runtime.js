/* global Selector, __SELECTPICKER_EXPOSE_GLOBAL__ */

// <editor-fold desc="Keyboard handling and auto-initialization">
var KEYDOWN_SELECTOR = '.bootstrap-select [' + Selector.DATA_TOGGLE + '], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input';

function initSelectpickerRuntime (Selectpicker, exposeGlobal) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Handle keyboard navigation ourselves. This listener runs in the capture
  // phase on `window` so it executes before Bootstrap's `document`-level
  // (capture-phase, delegated) dropdown keydown handler and prevents it from
  // processing bootstrap-select's custom menu (which would otherwise error on
  // relocated/container menus and conflict with our own navigation). This
  // replaces the upstream approach of unbinding Bootstrap's global handler.
  window.addEventListener('keydown', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;

    // Any keydown originating inside a bootstrap-select widget (or its
    // relocated menu container) must not reach Bootstrap's dropdown keydown
    // handler.
    var widget = target.closest('.bootstrap-select, .bs-container');
    if (!widget) return;

    e.stopImmediatePropagation();

    var trigger = target.closest(KEYDOWN_SELECTOR);
    if (!trigger) return;

    var instance;
    for (var node = trigger; node; node = node.parentElement) {
      if (node.bootstrapSelectInstance) {
        instance = node.bootstrapSelectInstance;
        break;
      }
    }

    if (instance) instance._keydown(e, trigger);
  }, true);

  document.addEventListener('focusin', function (e) {
    var target = e.target;
    if (target && target.closest && target.closest(KEYDOWN_SELECTOR)) {
      e.stopPropagation();
    }
  });

  function initAll () {
    var selects = document.querySelectorAll('.selectpicker');
    Array.prototype.forEach.call(selects, function (select) {
      Selectpicker.getOrCreateInstance(select);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  if (exposeGlobal) {
    window.Selectpicker = Selectpicker;
  }
}

initSelectpickerRuntime(
  Selectpicker,
  typeof __SELECTPICKER_EXPOSE_GLOBAL__ === 'undefined' ? true : __SELECTPICKER_EXPOSE_GLOBAL__
);
// </editor-fold>

return Selectpicker;
