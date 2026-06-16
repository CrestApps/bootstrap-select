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
 * Locale: FR (French; Français)
 * Region: FR (France)
 */
Selectpicker.setDefaults({
  noneSelectedText: 'Aucune sélection',
  noneResultsText: 'Aucun résultat pour {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected > 1) ? '{0} éléments sélectionnés' : '{0} élément sélectionné';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll > 1) ? 'Limite atteinte ({n} éléments max)' : 'Limite atteinte ({n} élément max)',
      (numGroup > 1) ? 'Limite du groupe atteinte ({n} éléments max)' : 'Limite du groupe atteinte ({n} élément max)'
    ];
  },
  multipleSeparator: ', ',
  selectAllText: 'Tout sélectionner',
  deselectAllText: 'Tout désélectionner'
});


}));
//# sourceMappingURL=defaults-fr_FR.js.map
