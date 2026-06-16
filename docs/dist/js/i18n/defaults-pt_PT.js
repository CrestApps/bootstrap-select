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
* Locale: PT (Portuguese; português)
* Region: PT (Portugal; Portugal)
* Author: Burnspirit <burnspirit@gmail.com>
*/
Selectpicker.setDefaults({
  noneSelectedText: 'Nenhum seleccionado',
  noneResultsText: 'Sem resultados contendo {0}',
  countSelectedText: 'Selecionado {0} de {1}',
  maxOptionsText: ['Limite ultrapassado (máx. {n} {var})', 'Limite de seleções ultrapassado (máx. {n} {var})', ['itens', 'item']],
  multipleSeparator: ', ',
  selectAllText: 'Selecionar Tudo',
  deselectAllText: 'Desmarcar Todos'
});


}));
//# sourceMappingURL=defaults-pt_PT.js.map
