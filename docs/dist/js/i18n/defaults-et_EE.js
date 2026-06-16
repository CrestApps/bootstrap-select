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
 * Locale: ET (Eesti keel)
 * Region: EE (Estonia)
 */
Selectpicker.setDefaults({
  noneSelectedText: 'Valikut pole tehtud',
  noneResultsText: 'Otsingule {0} ei ole vasteid',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} item selected' : '{0} items selected';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      'Limiit on {n} max',
      'Globaalne limiit on {n} max'
    ];
  },
  selectAllText: 'Vali kõik',
  deselectAllText: 'Tühista kõik',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-et_EE.js.map
