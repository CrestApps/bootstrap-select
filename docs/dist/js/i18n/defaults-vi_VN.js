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
  noneSelectedText: 'Chưa chọn',
  noneResultsText: 'Không có kết quả cho {0}',
  countSelectedText: function (numSelected, numTotal) {
    return '{0} mục đã chọn';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      'Không thể chọn (giới hạn {n} mục)',
      'Không thể chọn (giới hạn {n} mục)'
    ];
  },
  selectAllText: 'Chọn tất cả',
  deselectAllText: 'Bỏ chọn',
  multipleSeparator: ', '
});

}));

//# sourceMappingURL=defaults-vi_VN.js.map