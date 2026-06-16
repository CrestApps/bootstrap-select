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
 * Locale: KO (Korean)
 * Region: KR (South Korea)
 */
Selectpicker.setDefaults({
  noneSelectedText: '항목을 선택해주세요',
  noneResultsText: '{0} 검색 결과가 없습니다',
  countSelectedText: function (numSelected, numTotal) {
    return '{0}개를 선택하였습니다';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      '{n}개까지 선택 가능합니다',
      '해당 그룹은 {n}개까지 선택 가능합니다'
    ];
  },
  selectAllText: '전체선택',
  deselectAllText: '전체해제',
  multipleSeparator: ', '
});


}));
//# sourceMappingURL=defaults-ko_KR.js.map
