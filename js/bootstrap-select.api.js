/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.
  val (value) {
    var element = this.element;

    if (typeof value !== 'undefined') {
      var selectedOptions = getSelectedOptions.call(this),
          prevValue = getSelectValues.call(this, selectedOptions);

      changedArguments = [null, null, prevValue];

      if (!Array.isArray(value)) value = [ value ];

      value.map(String);

      for (var i = 0; i < selectedOptions.length; i++) {
        var item = selectedOptions[i];

        if (item && value.indexOf(String(item.value)) === -1) {
          this.setSelected(item, false);
        }
      }

      // only update selected value if it matches an existing option
      this.selectpicker.main.data.filter(function (item) {
        if (value.indexOf(String(item.value)) !== -1) {
          this.setSelected(item, true);
          return true;
        }

        return false;
      }, this);

      if (this.options.source.data) element.appendChild(this.selectpicker.main.optionQueue);

      this._emit('changed', changedArguments ? {
        clickedIndex: changedArguments[0],
        isSelected: changedArguments[1],
        previousValue: changedArguments[2]
      } : null);

      if (this.newElement.classList.contains(classNames.SHOW)) {
        if (this.multiple) {
          this.setOptionStatus(true);
        } else {
          var liSelectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

          if (typeof liSelectedIndex === 'number') {
            this.setSelected(this.selectpicker.current.data[liSelectedIndex], true);
          }
        }
      }

      this.render();

      changedArguments = null;

      return this.element;
    } else {
      return this.getValue();
    }
  }

  changeAll (status) {
    if (!this.multiple) return;
    if (typeof status === 'undefined') status = true;

    var element = this.element,
        previousSelected = 0,
        currentSelected = 0,
        prevValue = getSelectValues.call(this);

    element.classList.add('bs-select-hidden');

    for (var i = 0, data = this.selectpicker.current.data, len = data.length; i < len; i++) {
      var liData = data[i],
          option = liData.option;

      if (option && !liData.disabled && liData.type !== 'divider') {
        if (liData.selected) previousSelected++;
        option.selected = status;
        liData.selected = status;
        if (status === true) currentSelected++;
      }
    }

    element.classList.remove('bs-select-hidden');

    if (previousSelected === currentSelected) return;

    this.setOptionStatus();

    changedArguments = [null, null, prevValue];

    triggerNative(this.element, 'change');
  }

  selectAll () {
    return this.changeAll(true);
  }

  deselectAll () {
    return this.changeAll(false);
  }

  toggle (e, state) {
    var isActive,
        triggerToggle = state === undefined;

    if (e && e.stopPropagation) e.stopPropagation();

    if (triggerToggle === false) {
      isActive = this.newElement.classList.contains(classNames.SHOW);
      triggerToggle = (state === true && isActive === false) || (state === false && isActive === true);
    }

    if (triggerToggle) this.dropdown.toggle();
  }

  open (e) {
    this.toggle(e, true);
  }

  close (e) {
    this.toggle(e, false);
  }

  _keydown (e, el) {
    var that = this,
        which = e.which || e.keyCode,
        isToggle = el.classList.contains('dropdown-toggle'),
        items = that.findLis(),
        index,
        isActive,
        liActive,
        activeLi,
        offsetVal,
        updateScroll = false,
        downOnTab = which === keyCodes.TAB && !isToggle && !that.options.selectOnTab,
        isArrowKey = REGEXP_ARROW.test(which) || downOnTab,
        scrollTop = that.menuInner.scrollTop,
        isVirtual = that.isVirtual(),
        position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;

    // do nothing if a function key is pressed
    if (which >= 112 && which <= 123) return;

    isActive = that.menu.classList.contains(classNames.SHOW);

    if (
      !isActive &&
        (
          isArrowKey ||
          (which >= 48 && which <= 57) ||
          (which >= 96 && which <= 105) ||
          (which >= 65 && which <= 90)
        )
    ) {
      that.dropdown.show();

      if (that.options.liveSearch) {
        that.searchbox.focus();
        return;
      }
    }

    if (which === keyCodes.ESCAPE && isActive) {
      e.preventDefault();
      that.dropdown.hide();
      that.button.focus();
    }

    if (isArrowKey) { // if up or down
      if (!items.length) return;

      liActive = that.activeElement;
      index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;

      if (index !== -1) {
        that.defocusItem(liActive);
      }

      if (which === keyCodes.ARROW_UP) { // up
        if (index !== -1) index--;
        if (index + position0 < 0) index += items.length;

        if (!that.selectpicker.view.canHighlight[index + position0]) {
          index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
          if (index === -1) index = items.length - 1;
        }
      } else if (which === keyCodes.ARROW_DOWN || downOnTab) { // down
        index++;
        if (index + position0 >= that.selectpicker.view.canHighlight.length) index = that.selectpicker.view.firstHighlightIndex;

        if (!that.selectpicker.view.canHighlight[index + position0]) {
          index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
        }
      }

      e.preventDefault();

      var liActiveIndex = position0 + index;

      if (which === keyCodes.ARROW_UP) { // up
        // scroll to bottom and highlight last option
        if (position0 === 0 && index === items.length - 1) {
          that.menuInner.scrollTop = that.menuInner.scrollHeight;

          liActiveIndex = that.selectpicker.current.elements.length - 1;
        } else {
          activeLi = that.selectpicker.current.data[liActiveIndex];

          // could be undefined if no results exist
          if (activeLi) {
            offsetVal = activeLi.position - activeLi.height;

            updateScroll = offsetVal < scrollTop;
          }
        }
      } else if (which === keyCodes.ARROW_DOWN || downOnTab) { // down
        // scroll to top and highlight first option
        if (index === that.selectpicker.view.firstHighlightIndex) {
          that.menuInner.scrollTop = 0;

          liActiveIndex = that.selectpicker.view.firstHighlightIndex;
        } else {
          activeLi = that.selectpicker.current.data[liActiveIndex];

          // could be undefined if no results exist
          if (activeLi) {
            offsetVal = activeLi.position - that.sizeInfo.menuInnerHeight;

            updateScroll = offsetVal > scrollTop;
          }
        }
      }

      liActive = that.selectpicker.current.elements[liActiveIndex];

      that.activeElement = (that.selectpicker.current.data[liActiveIndex] || {}).element;

      that.focusItem(liActive);

      that.selectpicker.view.currentActive = liActive;

      if (updateScroll) that.menuInner.scrollTop = offsetVal;

      if (that.options.liveSearch) {
        that.searchbox.focus();
      } else {
        el.focus();
      }
    } else if (
      (!el.matches('input') && !REGEXP_TAB_OR_ESCAPE.test(which)) ||
        (which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory)
    ) {
      var matches = [],
          keyHistory;

      e.preventDefault();

      that.selectpicker.keydown.keyHistory += keyCodeMap[which];

      if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
      that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();

      keyHistory = that.selectpicker.keydown.keyHistory;

      // if all letters are the same, set keyHistory to just the first character when searching
      if (/^(.)\1+$/.test(keyHistory)) {
        keyHistory = keyHistory.charAt(0);
      }

      // find matches
      for (var i = 0; i < that.selectpicker.current.data.length; i++) {
        var li = that.selectpicker.current.data[i],
            hasMatch;

        hasMatch = stringSearch(li, keyHistory, 'startsWith', true);

        if (hasMatch && that.selectpicker.view.canHighlight[i]) {
          matches.push(li.element);
        }
      }

      if (matches.length) {
        var matchIndex = 0;

        Array.prototype.forEach.call(items, function (item) {
          item.classList.remove('active');
          if (item.firstChild) item.firstChild.classList.remove('active');
        });

        // either only one key has been pressed or they are all the same key
        if (keyHistory.length === 1) {
          matchIndex = matches.indexOf(that.activeElement);

          if (matchIndex === -1 || matchIndex === matches.length - 1) {
            matchIndex = 0;
          } else {
            matchIndex++;
          }
        }

        activeLi = that.selectpicker.main.data[that.selectpicker.main.elements.indexOf(matches[matchIndex])];

        if (activeLi) {
          if (scrollTop - activeLi.position > 0) {
            offsetVal = activeLi.position - activeLi.height;
            updateScroll = true;
          } else {
            offsetVal = activeLi.position - that.sizeInfo.menuInnerHeight;
            // if the option is already visible at the current scroll position, just keep it the same
            updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
          }
        }

        liActive = matches[matchIndex];

        that.activeElement = liActive;

        that.focusItem(liActive);

        if (liActive) liActive.firstChild.focus();

        if (updateScroll) that.menuInner.scrollTop = offsetVal;

        el.focus();
      }
    }

    // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
    if (
      isActive &&
        (
          (which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory) ||
          which === keyCodes.ENTER ||
          (which === keyCodes.TAB && that.options.selectOnTab)
        )
    ) {
      if (which !== keyCodes.SPACE) e.preventDefault();

      if (!that.options.liveSearch || which !== keyCodes.SPACE) {
        var activeAnchor = that.menuInner.querySelector('.active a');
        if (activeAnchor) that.onOptionClick(activeAnchor, e, true); // retain active class
        el.focus();

        if (!that.options.liveSearch) {
          // Prevent screen from scrolling if the user hits the spacebar
          e.preventDefault();
          // Fixes spacebar selection of dropdown items in FF & IE
          spaceSelectFlag = true;
        }
      }
    }
  }

  mobile () {
    // ensure mobile is set to true if mobile function is called after init
    this.options.mobile = true;
    this.element.classList.add('mobile-device');
  }

  resetMenuData () {
    this.selectpicker.main.data = [];
    this.selectpicker.main.elements = [];
    this.selectpicker.main.hasMore = false;
    this.selectpicker.search.data = [];
    this.selectpicker.search.elements = [];
    this.selectpicker.search.hasMore = false;
    this.selectpicker.current.data = this.selectpicker.main.data;
    this.selectpicker.current.elements = this.selectpicker.main.elements;
    this.selectpicker.current.hasMore = false;
    this.selectpicker.isSearching = false;
  }

  refresh () {
    var that = this;
    // update options if data attributes have been changed
    var config = stripRemovedOptions(Object.assign({}, this.options, getAttributesObject(this.element), getDataset(this.element)));
    this.options = config;

    if (this.options.source.data) {
      this.render();
      this.buildList();
    } else {
      this.resetMenuData();
      this.fetchData(function () {
        that.render();
        that.buildList();
      });
    }

    this.checkDisabled();
    this.setStyle();
    this.setWidth();

    this.setSize(true);

    this._emit('refreshed');
  }

  hide () {
    this.newElement.style.display = 'none';
  }

  show () {
    this.newElement.style.display = '';
  }

  remove () {
    if (this.newElement.parentNode) this.newElement.parentNode.removeChild(this.newElement);
    instanceMap.delete(this.element);
  }

  destroy () {
    // move the select back out of newElement, then remove newElement
    if (this.newElement.parentNode) {
      this.newElement.parentNode.insertBefore(this.element, this.newElement);
      this.newElement.parentNode.removeChild(this.newElement);
    }

    if (this.bsContainer) {
      if (this.bsContainer.parentNode) this.bsContainer.parentNode.removeChild(this.bsContainer);
    } else if (this.menu && this.menu.parentNode) {
      this.menu.parentNode.removeChild(this.menu);
    }

    if (this.selectpicker.view.titleOption && this.selectpicker.view.titleOption.parentNode) {
      this.selectpicker.view.titleOption.parentNode.removeChild(this.selectpicker.view.titleOption);
    }

    // remove all tracked event listeners
    for (var i = 0; i < this._listeners.length; i++) {
      var l = this._listeners[i];
      l.el.removeEventListener(l.type, l.handler, l.options);
    }
    this._listeners = [];

    for (var key in this._named) {
      if (Object.prototype.hasOwnProperty.call(this._named, key)) {
        this._removeNamed(key);
      }
    }

    if (this.dropdown && typeof this.dropdown.dispose === 'function') {
      this.dropdown.dispose();
    }

    this.element.classList.remove('bs-select-hidden', 'selectpicker', 'mobile-device');

    instanceMap.delete(this.element);
  }
}

// stores element -> Selectpicker instance
var instanceMap = new WeakMap();

Selectpicker.NAME = 'selectpicker';
Selectpicker.VERSION = '1.2.0';

// user-provided global defaults (set via Selectpicker.setDefaults, used by i18n files)
Selectpicker.defaults = null;

// part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
Selectpicker.DEFAULTS = {
  noneSelectedText: 'Nothing selected',
  noneResultsText: 'No results matched {0}',
  countSelectedText: function (numSelected) {
    return (numSelected == 1) ? '{0} item selected' : '{0} items selected';
  },
  maxOptionsText: function (numAll, numGroup) {
    return [
      (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
      (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
    ];
  },
  selectAllText: 'Select All',
  deselectAllText: 'Deselect All',
  source: {
    pageSize: 40,
    create: null
  },
  chunkSize: 40,
  doneButton: false,
  doneButtonText: 'Close',
  multipleSeparator: ', ',
  style: classNames.BUTTONCLASS,
  size: 'auto',
  placeholder: null,
  allowClear: false,
  selectedTextFormat: 'values',
  width: false,
  hideDisabled: false,
  showSubtext: false,
  showIcon: true,
  showContent: true,
  dropupAuto: true,
  header: false,
  liveSearch: false,
  liveSearchPlaceholder: null,
  liveSearchNormalize: false,
  liveSearchStyle: 'contains',
  openOptions: false,
  openOptionsText: 'Create "{0}"',
  selectionIndicator: 'checkmark',
  actionsBox: false,
  iconBase: classNames.ICONBASE,
  tickIcon: classNames.TICKICON,
  showTick: false,
  showSelectedTags: false,
  selectedItemsStyle: 'tags',
  selectedTagRemoveLabel: 'Remove',
  template: {
    caret: '<span class="caret"></span>'
  },
  maxOptions: false,
  selectOnTab: true,
  dropdownAlignRight: false,
  virtualScroll: 600,
  sanitize: true,
  sanitizeFn: null,
  whiteList: DefaultWhitelist
};

Selectpicker._buildConfig = function (element, options) {
  options = stripRemovedOptions(options || {});

  var dataAttributes = stripRemovedOptions(getDataset(element));

  for (var dataAttr in dataAttributes) {
    if (Object.prototype.hasOwnProperty.call(dataAttributes, dataAttr) && DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
      delete dataAttributes[dataAttr];
    }
  }

  var userDefaults = stripRemovedOptions(Selectpicker.defaults || {});

  var config = Object.assign({}, Selectpicker.DEFAULTS, userDefaults, getAttributesObject(element), dataAttributes, options);
  config.template = Object.assign({}, Selectpicker.DEFAULTS.template, userDefaults.template || {}, dataAttributes.template, options.template);
  config.source = Object.assign({}, Selectpicker.DEFAULTS.source, userDefaults.source || {}, options.source);

  return applyLegacyOptions(element, config);
};

Selectpicker.setDefaults = function (newDefaults) {
  Selectpicker.defaults = stripRemovedOptions(Object.assign({}, Selectpicker.defaults, newDefaults));
};

Selectpicker.getInstance = function (element) {
  if (typeof element === 'string') element = document.querySelector(element);
  return instanceMap.get(element) || null;
};

Selectpicker.getOrCreateInstance = function (element, options) {
  if (typeof element === 'string') element = document.querySelector(element);
  if (!element || element.tagName !== 'SELECT') return null;

  var instance = instanceMap.get(element);

  if (instance) {
    options = stripRemovedOptions(options);

    if (options && typeof options === 'object') {
      for (var i in options) {
        if (Object.prototype.hasOwnProperty.call(options, i)) {
          instance.options[i] = options[i];
        }
      }
    }

    return instance;
  }

  return new Selectpicker(element, typeof options === 'object' ? options : {});
};

// Runtime wiring lives in js/bootstrap-select.runtime.js so each distribution
// can choose whether it should expose a browser global or stay module-scoped.
