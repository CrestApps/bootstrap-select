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
 * Locale: TH (Thai)
 * Region: TH (Thailand)
 * Author: Ekkachai Sohmontha
 */
Selectpicker.setDefaults({
  noneSelectedText: 'ไม่ได้เลือกอะไรเลย',
  noneResultsText: 'ไม่มีผลลัพธ์ที่ตรงกัน {0}',
  countSelectedText: '{0} รายการที่เลือก',
  maxOptionsText: ['เกินจำนวนที่กำหนด (สูงสุด {n} รายการ)', 'เกินจำนวนที่กำหนด (สูงสุด {n} กลุ่ม)'],
  selectAllText: 'เลือกทั้งหมด',
  deselectAllText: 'ไม่เลือกทั้งหมด',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-th_TH.js.map
