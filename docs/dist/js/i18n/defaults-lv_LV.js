/*!
 * Bootstrap-select v1.1.1 (https://github.com/CrestApps/crestapps-bootstrap-select)
 *
 * CrestApps fork (vanilla JavaScript, Bootstrap 5+) of snapappointments/bootstrap-select
 * Copyright 2012-2018 SnapAppointments, LLC (original work)
 * Fork modifications Copyright 2024-2026 CrestApps
 * Licensed under MIT (https://github.com/CrestApps/crestapps-bootstrap-select/blob/main/LICENSE)
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
Selectpicker.setDefaults({
  noneSelectedText: 'Nekas nav atzīmēts',
  noneResultsText: 'Nav neviena rezultāta {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} ieraksts atzīmēts' : '{0} ieraksti atzīmēts';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'Sasniegts limits ({n} ieraksts maksimums)' : 'Sasniegts limits ({n} ieraksti maksimums)',
      (numGroup == 1) ? 'Sasniegts grupas limits ({n} ieraksts maksimums)' : 'Sasniegts grupas limits ({n} ieraksti maksimums)'
    ];
  },
  selectAllText: 'Atzīmēt visu',
  deselectAllText: 'Neatzīmēt nevienu',
  multipleSeparator: ', '
});

}));

//# sourceMappingURL=defaults-lv_LV.js.map