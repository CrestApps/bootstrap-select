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
/*!
 * Translated default messages for bootstrap-select.
 * Locale: AR (Arabic)
 * Author: Yasser Lotfy <y_l@alive.com>
 */
Selectpicker.setDefaults({
  noneSelectedText: 'لم يتم إختيار شئ',
  noneResultsText: 'لا توجد نتائج مطابقة لـ {0}',
  countSelectedText: function (numSelected, numTotal) {
    return (numSelected == 1) ? '{0} خيار تم إختياره' : '{0} خيارات تمت إختيارها';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'تخطى الحد المسموح ({n} خيار بحد أقصى)' : 'تخطى الحد المسموح ({n} خيارات بحد أقصى)',
      (numGroup == 1) ? 'تخطى الحد المسموح للمجموعة ({n} خيار بحد أقصى)' : 'تخطى الحد المسموح للمجموعة ({n} خيارات بحد أقصى)'
    ];
  },
  selectAllText: 'إختيار الجميع',
  deselectAllText: 'إلغاء إختيار الجميع',
  multipleSeparator: '، '
});

}));

//# sourceMappingURL=defaults-ar_AR.js.map