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
  noneSelectedText: 'Ingen valgt',
  noneResultsText: 'Søket gir ingen treff {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} alternativ valgt' : '{0} alternativer valgt';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'Grense nådd (maks {n} valg)' : 'Grense nådd (maks {n} valg)',
      (numGroup == 1) ? 'Grense for grupper nådd (maks {n} grupper)' : 'Grense for grupper nådd (maks {n} grupper)'
    ];
  },
  selectAllText: 'Merk alle',
  deselectAllText: 'Fjern alle',
  multipleSeparator: ', '
});

}));

//# sourceMappingURL=defaults-nb_NO.js.map