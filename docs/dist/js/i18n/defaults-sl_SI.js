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
  noneSelectedText: 'Nič izbranega',
  noneResultsText: 'Ni zadetkov za {0}',
  countSelectedText: '{0} od {1} izbranih',
  maxOptionsText: function (numAll, numGroup) {
    return [
      'Omejitev dosežena (max. izbranih: {n})',
      'Omejitev skupine dosežena (max. izbranih: {n})'
    ];
  },
  selectAllText: 'Izberi vse',
  deselectAllText: 'Počisti izbor',
  multipleSeparator: ', '
});

}));

//# sourceMappingURL=defaults-sl_SI.js.map