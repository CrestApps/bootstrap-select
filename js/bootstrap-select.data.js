/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.
  fetchData (callback, type, page, searchValue) {
    page = page || 1;
    type = type || 'data';

    var that = this,
        data = this.options.source[type],
        builtData;

    if (data) {
      this.options.virtualScroll = true;

      if (typeof data === 'function') {
        data.call(
          this,
          function (data, more, totalItems) {
            var current = that.selectpicker[type === 'search' ? 'search' : 'main'];
            current.hasMore = more;
            current.totalItems = totalItems;
            builtData = that.buildData(data, type);
            callback.call(that, builtData);
            that._emit('fetched');
          },
          page,
          searchValue
        );
      } else if (Array.isArray(data)) {
        builtData = that.buildData(data, type);
        callback.call(that, builtData);
      }
    } else {
      builtData = this.buildData(false, type);
      callback.call(that, builtData);
    }
  }

  buildData (data, type) {
    var that = this;
    var dataGetter = data === false ? getOptionData.fromOption : getOptionData.fromDataSource;

    var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([style*="display: none"])',
        mainData = [],
        startLen = this.selectpicker.main.data ? this.selectpicker.main.data.length : 0,
        optID = 0,
        startIndex = this.setPlaceholder() && !data ? 1 : 0; // append the titleOption if necessary and skip the first option in the loop

    if (type === 'search') {
      startLen = this.selectpicker.search.data.length;
    }

    if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

    var selectOptions = data ? data.filter(filterHidden, this) : this.element.querySelectorAll('select > *' + optionSelector);

    function addDivider (config) {
      var previousData = mainData[mainData.length - 1];

      // ensure optgroup doesn't create back-to-back dividers
      if (
        previousData &&
          previousData.type === 'divider' &&
          (previousData.optID || config.optID)
      ) {
        return;
      }

      config = config || {};
      config.type = 'divider';

      mainData.push(config);
    }

    function addOption (item, config) {
      config = config || {};

      config.divider = dataGetter(item, 'divider');

      if (config.divider === true) {
        addDivider({
          optID: config.optID
        });
      } else {
        var liIndex = mainData.length + startLen,
            cssText = dataGetter(item, 'style'),
            inlineStyle = cssText ? htmlEscape(cssText) : '',
            optionClass = (item.className || '') + (config.optgroupClass || '');

        if (config.optID) optionClass = 'opt ' + optionClass;

        config.optionClass = optionClass.trim();
        config.inlineStyle = inlineStyle;

        config.text = dataGetter(item, 'text');
        config.title = dataGetter(item, 'title');
        config.content = dataGetter(item, 'content');
        config.tokens = dataGetter(item, 'tokens');
        config.subtext = dataGetter(item, 'subtext');
        config.icon = dataGetter(item, 'icon');

        config.display = config.content || config.text;
        config.value = item.value === undefined ? item.text : item.value;
        config.type = 'option';
        config.index = liIndex;

        config.option = !item.option ? item : item.option; // reference option element if it exists
        config.option.liIndex = liIndex;
        config.selected = !!item.selected;
        config.disabled = config.disabled || !!item.disabled;

        if (data !== false) {
          if (that.selectpicker.optionValuesDataMap[config.value]) {
            config = Object.assign(that.selectpicker.optionValuesDataMap[config.value], config);
          } else {
            that.selectpicker.optionValuesDataMap[config.value] = config;
          }
        }

        mainData.push(config);
      }
    }

    function addOptgroup (index, selectOptions) {
      var optgroup = selectOptions[index],
          // skip placeholder option
          previous = index - 1 < startIndex ? false : selectOptions[index - 1],
          next = selectOptions[index + 1],
          options = data ? optgroup.children.filter(filterHidden, this) : optgroup.querySelectorAll('option' + optionSelector);

      if (!options.length) return;

      var config = {
            display: htmlEscape(dataGetter(item, 'label')),
            subtext: dataGetter(optgroup, 'subtext'),
            icon: dataGetter(optgroup, 'icon'),
            type: 'optgroup-label',
            optgroupClass: ' ' + (optgroup.className || ''),
            optgroup: optgroup
          },
          headerIndex,
          lastIndex;

      optID++;

      if (previous) {
        addDivider({ optID: optID });
      }

      config.optID = optID;

      mainData.push(config);

      for (var j = 0, len = options.length; j < len; j++) {
        var option = options[j];

        if (j === 0) {
          headerIndex = mainData.length - 1;
          lastIndex = headerIndex + len;
        }

        addOption(option, {
          headerIndex: headerIndex,
          lastIndex: lastIndex,
          optID: config.optID,
          optgroupClass: config.optgroupClass,
          disabled: optgroup.disabled
        });
      }

      if (next) {
        addDivider({ optID: optID });
      }
    }

    var item;

    for (var len = selectOptions.length, i = startIndex; i < len; i++) {
      item = selectOptions[i];
      var children = item.children;

      if (children && children.length) {
        addOptgroup.call(this, i, selectOptions);
      } else {
        addOption.call(this, item, {});
      }
    }

    switch (type) {
      case 'data': {
        if (!this.selectpicker.main.data) {
          this.selectpicker.main.data = [];
        }
        Array.prototype.push.apply(this.selectpicker.main.data, mainData);
        this.selectpicker.current.data = this.selectpicker.main.data;
        break;
      }
      case 'search': {
        Array.prototype.push.apply(this.selectpicker.search.data, mainData);
        break;
      }
    }

    return mainData;
  }

  buildList (size, searching) {
    var that = this,
        selectData = searching ? this.selectpicker.search.data : this.selectpicker.main.data,
        mainElements = [],
        widestOptionLength = 0;

    if (that.options.showTick || that.multiple) {
      elementTemplates.checkMark.className = this.options.selectionIndicator === 'checkbox'
        ? 'check-mark bs-selection-indicator'
        : this.options.iconBase + ' ' + that.options.tickIcon + ' check-mark';

      if (!elementTemplates.checkMark.parentNode) {
        elementTemplates.a.appendChild(elementTemplates.checkMark);
      }
    }

    function buildElement (mainElements, item) {
      var liElement,
          combinedLength = 0;

      switch (item.type) {
        case 'divider':
          liElement = generateOption.li(
            false,
            classNames.DIVIDER,
            (item.optID ? item.optID + 'div' : undefined)
          );

          break;

        case 'option':
          liElement = generateOption.li(
            generateOption.a(
              generateOption.text.call(that, item),
              item.optionClass,
              item.inlineStyle
            ),
            '',
            item.optID
          );

          if (liElement.firstChild) {
            liElement.firstChild.id = that.selectId + '-' + item.index;
          }

          break;

        case 'optgroup-label':
          liElement = generateOption.li(
            generateOption.label.call(that, item),
            'dropdown-header' + item.optgroupClass,
            item.optID
          );

          break;
      }

      if (item.content) item.sanitized = false;

      if (!item.element) {
        item.element = liElement;
      } else {
        item.element.innerHTML = liElement.innerHTML;
      }
      mainElements.push(item.element);

      // count the number of characters in the option - not perfect, but should work in most cases
      if (item.display) combinedLength += item.display.length;
      if (item.subtext) combinedLength += item.subtext.length;
      // if there is an icon, ensure this option's width is checked
      if (item.icon) combinedLength += 1;

      if (combinedLength > widestOptionLength) {
        widestOptionLength = combinedLength;

        // guess which option is the widest
        that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
      }
    }

    var startIndex = size || 0;

    for (var len = selectData.length, i = startIndex; i < len; i++) {
      var item = selectData[i];

      buildElement(mainElements, item);
    }

    if (size) {
      if (searching) {
        Array.prototype.push.apply(this.selectpicker.search.elements, mainElements);
      } else {
        Array.prototype.push.apply(this.selectpicker.main.elements, mainElements);
        this.selectpicker.current.elements = this.selectpicker.main.elements;
      }
    } else {
      if (searching) {
        this.selectpicker.search.elements = mainElements;
      } else {
        this.selectpicker.main.elements = this.selectpicker.current.elements = mainElements;
      }
    }
  }

