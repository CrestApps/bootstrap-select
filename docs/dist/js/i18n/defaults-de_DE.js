/*!
 * Bootstrap-select v1.1.2 (https://github.com/CrestApps/crestapps-bootstrap-select)
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
  noneSelectedText: 'Bitte wählen...',
  noneResultsText: 'Keine Ergebnisse für {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} Element ausgewählt' : '{0} Elemente ausgewählt';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'Limit erreicht ({n} Element max.)' : 'Limit erreicht ({n} Elemente max.)',
      (numGroup == 1) ? 'Gruppen-Limit erreicht ({n} Element max.)' : 'Gruppen-Limit erreicht ({n} Elemente max.)'
    ];
  },
  selectAllText: 'Alles auswählen',
  deselectAllText: 'Nichts auswählen',
  multipleSeparator: ', '
});

}));

//# sourceMappingURL=defaults-de_DE.js.map