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
  noneSelectedText: 'Nessuna selezione',
  noneResultsText: 'Nessun risultato per {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? 'Selezionato {0} di {1}' : 'Selezionati {0} di {1}';
  },
  maxOptionsText: ['Limite raggiunto ({n} {var} max)', 'Limite del gruppo raggiunto ({n} {var} max)', ['elementi', 'elemento']],
  multipleSeparator: ', ',
  selectAllText: 'Seleziona Tutto',
  deselectAllText: 'Deseleziona Tutto'
});

}));

//# sourceMappingURL=defaults-it_IT.js.map