/* global Selectpicker */
// In-page test fixtures. These run in the browser context (so option source
// functions are available) and mirror the original Cypress test configurations.
(function () {
  'use strict';

  var testArr = new Array(1000).fill(0).map(function (x, i) {
    return { text: 'Option ' + i };
  });

  function buildPages (data) {
    var pageSize = 40;
    var pageCount = data.length / pageSize;
    var pages = [];

    for (var i = 0; i < pageCount; i++) {
      var pageStart = i * pageSize;
      pages.push(data.slice(pageStart, pageStart + pageSize));
    }

    return pages;
  }

  var single = [{
    title: 'built via HTML',
    config: {
      html: '<select class="selectpicker" data-live-search="true">' +
        testArr.map(function (obj) {
          return '<option value="' + obj.text + '">' + obj.text + '</option>';
        }).join('') +
        '</select>'
    }
  }, {
    title: 'built via source with source.search',
    config: {
      options: {
        liveSearch: true,
        source: {
          data: function (callback, page) {
            var pages = buildPages(testArr);
            callback(pages[page - 1], pages.length > page);
          },
          search: function (callback, page, searchTerm) {
            if (searchTerm) {
              var searchResults = testArr.filter(function (obj) {
                return (obj.text && obj.text.toLowerCase().includes(searchTerm.toLowerCase()));
              });
              var pages = buildPages(searchResults);

              callback(pages[page - 1], pages.length > page);
            }
          }
        }
      }
    }
  }, {
    title: 'built via source',
    config: {
      options: {
        liveSearch: true,
        source: {
          data: function (callback) {
            callback(testArr);
          }
        }
      }
    }
  }, {
    title: 'built via source (limit 30) with source.search',
    config: {
      options: {
        liveSearch: true,
        source: {
          data: function (callback, page) {
            var pages = buildPages(testArr.slice(0, 30));
            callback(pages[page - 1], pages.length > page);
          },
          search: function (callback, page, searchTerm) {
            if (searchTerm) {
              var searchResults = testArr.slice(0, 30).filter(function (obj) {
                return (obj.text && obj.text.toLowerCase().includes(searchTerm.toLowerCase()));
              });
              var pages = buildPages(searchResults);

              callback(pages[page - 1], pages.length > page);
            }
          }
        }
      }
    }
  }, {
    title: 'built via source (limit 30)',
    config: {
      options: {
        liveSearch: true,
        source: {
          data: function (callback) {
            callback(testArr.slice(0, 30));
          }
        }
      }
    }
  }];

  var optgroupTestArr = new Array(3).fill(0).map(function (x, i) {
    return {
      text: 'Optgroup ' + i,
      maxOptions: i + 1,
      children: new Array(4).fill(0).map(function (y, j) {
        return { text: 'Option ' + i + '-' + j };
      })
    };
  });

  var maxOptions = [{
    title: 'built via HTML',
    config: {
      html: '<select class="selectpicker" data-live-search="true" multiple data-max-options="4">' +
        optgroupTestArr.map(function (obj) {
          return '<optgroup label="' + obj.text + '" data-max-options="' + obj.maxOptions + '">' +
            obj.children.map(function (option) {
              return '<option value="' + option.text + '">' + option.text + '</option>';
            }).join('') +
            '</optgroup>';
        }).join('') +
        '</select>'
    }
  }, {
    title: 'built via source',
    config: {
      attrs: {
        multiple: true,
        'data-max-options': 4
      },
      options: {
        liveSearch: true,
        source: {
          data: function (callback) {
            callback(optgroupTestArr);
          }
        }
      }
    }
  }];

  function create (config) {
    var id = 'sp-' + Math.random().toString(36).slice(2);
    var select;

    if (config.html) {
      var tmp = document.createElement('div');
      tmp.innerHTML = config.html.trim();
      select = tmp.firstChild;
      if (!select.id) select.id = id;
      document.body.appendChild(select);
    } else {
      select = document.createElement('select');
      select.id = id;
      if (config.attrs) {
        for (var key in config.attrs) {
          if (Object.prototype.hasOwnProperty.call(config.attrs, key)) {
            var val = config.attrs[key];
            select.setAttribute(key, val === true ? '' : val);
          }
        }
      }
      document.body.appendChild(select);
    }

    Selectpicker.getOrCreateInstance(select, config.options || {});

    return select.id;
  }

  window.SelectpickerTests = {
    single: single,
    maxOptions: maxOptions,
    create: create
  };
})();
