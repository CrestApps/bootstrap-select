/*!
 * Bootstrap-select v1.2.0 (https://github.com/CrestApps/bootstrap-select)
 *
 * CrestApps fork (vanilla JavaScript, Bootstrap 5+) of snapappointments/bootstrap-select
 * Copyright 2012-2018 SnapAppointments, LLC (original work)
 * Fork modifications Copyright 2024-2026 CrestApps
 * Licensed under MIT (https://github.com/CrestApps/bootstrap-select/blob/main/LICENSE)
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['bootstrap'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments (Node, bundlers).
    var bootstrap;
    try {
      bootstrap = require('bootstrap');
    } catch (e) {
      bootstrap = undefined;
    }
    module.exports = factory(bootstrap);
  } else {
    // Browser globals.
    factory(typeof window !== 'undefined' ? window.bootstrap : undefined);
  }
}(function (bootstrap) {
  var __SELECTPICKER_EXPOSE_GLOBAL__ = true;

/*
 * Translated default messages for bootstrap-select.
 * Locale: RO (Romanian)
 * Region: RO (Romania)
 * Alex Florea <alecz.fia@gmail.com>
 */
Selectpicker.setDefaults({
  doneButtonText: 'Închide',
  noneSelectedText: 'Nu a fost selectat nimic',
  noneResultsText: 'Nu există niciun rezultat {0}',
  countSelectedText: '{0} din {1} selectat(e)',
  maxOptionsText: ['Limita a fost atinsă ({n} {var} max)', 'Limita de grup a fost atinsă ({n} {var} max)', ['iteme', 'item']],
  selectAllText: 'Selectează toate',
  deselectAllText: 'Deselectează toate',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-ro_RO.js.map
