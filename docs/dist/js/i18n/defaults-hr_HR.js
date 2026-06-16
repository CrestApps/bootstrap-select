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
 * Locale: HR (Croatia)
 * Region: HR (Croatia)
 */
Selectpicker.setDefaults({
  noneSelectedText: 'Odaberite stavku',
  noneResultsText: 'Nema rezultata pretrage {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} stavka selektirana' : '{0} stavke selektirane';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'Limit je postignut ({n} stvar maximalno)' : 'Limit je postignut ({n} stavke maksimalno)',
      (numGroup == 1) ? 'Grupni limit je postignut ({n} stvar maksimalno)' : 'Grupni limit je postignut ({n} stavke maksimalno)'
    ];
  },
  selectAllText: 'Selektiraj sve',
  deselectAllText: 'Deselektiraj sve',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-hr_HR.js.map
