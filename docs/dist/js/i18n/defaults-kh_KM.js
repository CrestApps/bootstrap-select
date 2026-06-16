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
 * Locale: KH (Khmer)
 * Region: kM (Khmer)
 */
Selectpicker.setDefaults({
  noneSelectedText: 'មិនមានអ្វីបានជ្រើសរើស',
  noneResultsText: 'មិនមានលទ្ធផល {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} ធាតុដែលបានជ្រើស' : '{0} ធាតុដែលបានជ្រើស';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'ឈានដល់ដែនកំណត់ ( {n} ធាតុអតិបរមា)' : 'អតិបរមាឈានដល់ដែនកំណត់ ( {n} ធាតុ)',
      (numGroup == 1) ? 'ដែនកំណត់ក្រុមឈានដល់ ( {n} អតិបរមាធាតុ)' : 'អតិបរមាក្រុមឈានដល់ដែនកំណត់ ( {n} ធាតុ)'
    ];
  },
  selectAllText: 'ជ្រើស​យក​ទាំងអស់',
  deselectAllText: 'មិនជ្រើស​យក​ទាំងអស',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-kh_KM.js.map
