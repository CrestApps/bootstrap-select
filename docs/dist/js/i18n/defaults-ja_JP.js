/*!
 * Bootstrap-select v1.1.1 (https://github.com/CrestApps/crestapps-bootstrap-select)
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
  noneSelectedText: '選択されていません',
  noneResultsText: '\'{0}\'は見つかりません',
  countSelectedText: '{0}/{1} 選択中',
  maxOptionsText: ['選択上限数を超えています(最大{n}{var})', 'グループの選択上限数を超えています(最大{n}{var})', ['アイテム', 'アイテム']],
  selectAllText: '全て選択',
  deselectAllText: '選択をクリア',
  multipleSeparator: ', '
});

}));

//# sourceMappingURL=defaults-ja_JP.js.map