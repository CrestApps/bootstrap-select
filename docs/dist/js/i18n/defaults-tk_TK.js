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
 * Locale: TK (Turkmen)
 * Region: TK (Turkmenistan)
 * Author: Atageldi Didarov
 */
Selectpicker.setDefaults({
  noneSelectedText: 'Hiç biri saýlanmady',
  noneResultsText: 'Gabat gelýän tapylmady {0}',
  countSelectedText: function (numSelected, numTotal) {
    return numSelected == 1 ? '{0} element saýlandy' : '{0} element saýlandy';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      numAll == 1
        ? 'Çäkden geçdi (maksimum {n} sany element)'
        : 'Çäkden geçdi (maksimum {n} sany element)',
      numGroup == 1
        ? 'Topar çäkleri geçdi (maksimum {n} sany element)'
        : 'Topar çäkleri geçdi (maksimum {n} sany element)'
    ];
  },
  selectAllText: 'Hemmesini saýla',
  deselectAllText: 'Hemmesini aýyr',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-tk_TK.js.map
