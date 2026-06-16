/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.
  findLis () {
    return this.menuInner.querySelectorAll('.inner > li');
  }

  render (init) {
    var that = this,
        element = this.element,
        // ensure titleOption is appended and selected (if necessary) before getting selectedOptions
        placeholderSelected = this.setPlaceholder() && element.selectedIndex === 0,
        selectedOptions = getSelectedOptions.call(this),
        selectedCount = selectedOptions.length,
        selectedValues = getSelectValues.call(this, selectedOptions),
        button = this.button,
        buttonInner = button.querySelector('.filter-option-inner-inner'),
        multipleSeparator = document.createTextNode(this.options.multipleSeparator),
        titleFragment = elementTemplates.fragment.cloneNode(false),
        forceCount = this.multiple && this.options.showSelectedTags && selectedCount > 0,
        showCount,
        countMax,
        hasContent = false;

    function createSelected (item) {
      if (item.selected) {
        that.createOption(item, true);
      } else if (item.children && item.children.length) {
        item.children.map(createSelected);
      }
    }

    // create selected option elements to ensure select value is correct
    if (this.options.source.data && init) {
      selectedOptions.map(createSelected);
      element.appendChild(this.selectpicker.main.optionQueue);

      if (placeholderSelected) placeholderSelected = element.selectedIndex === 0;
    }

    button.classList.toggle('bs-placeholder', that.multiple ? !selectedCount : !selectedValues && selectedValues !== 0);

    if (!that.multiple && selectedOptions.length === 1) {
      that.selectpicker.view.displayedValue = selectedValues;
    }

    if (this.options.selectedTextFormat === 'static') {
      titleFragment = generateOption.text.call(this, { text: this.options.placeholder }, true);
    } else {
      showCount = forceCount || this.multiple && this.options.selectedTextFormat.indexOf('count') !== -1 && selectedCount > 0;

      // determine if the number of selected options will be shown (showCount === true)
      if (showCount && !forceCount) {
        countMax = this.options.selectedTextFormat.split('>');
        showCount = (countMax.length > 1 && selectedCount > countMax[1]) || (countMax.length === 1 && selectedCount >= 2);
      }

      // only loop through all selected options if the count won't be shown
      if (showCount === false) {
        if (!placeholderSelected) {
          for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
            if (selectedIndex < 50) {
              var option = selectedOptions[selectedIndex],
                  titleOptions = {};

              if (option) {
                if (this.multiple && selectedIndex > 0) {
                  titleFragment.appendChild(multipleSeparator.cloneNode(false));
                }

                if (option.title) {
                  titleOptions.text = option.title;
                } else if (option.content && that.options.showContent) {
                  titleOptions.content = option.content.toString();
                  hasContent = true;
                } else {
                  if (that.options.showIcon) {
                    titleOptions.icon = option.icon;
                  }
                  if (that.options.showSubtext && !that.multiple && option.subtext) titleOptions.subtext = ' ' + option.subtext;
                  titleOptions.text = option.text.trim();
                }

                titleFragment.appendChild(generateOption.text.call(this, titleOptions, true));
              }
            } else {
              break;
            }
          }

          // add ellipsis
          if (selectedCount > 49) {
            titleFragment.appendChild(document.createTextNode('...'));
          }
        }
      } else {
        var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"]):not([style*="display: none"])';
        if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

        // If this is a multiselect, and selectedTextFormat is count, then show 1 of 2 selected, etc.
        var totalCount = this.element.querySelectorAll('select > option' + optionSelector + ', optgroup' + optionSelector + ' option' + optionSelector).length,
            tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedCount, totalCount) : this.options.countSelectedText;

        titleFragment = generateOption.text.call(this, {
          text: tr8nText.replace('{0}', selectedCount.toString()).replace('{1}', totalCount.toString())
        }, true);
      }
    }

    // If the select doesn't have a title, then use the default, or if nothing is set at all, use noneSelectedText
    if (!titleFragment.childNodes.length) {
      titleFragment = generateOption.text.call(this, {
        text: this.options.placeholder ? this.options.placeholder : this.options.noneSelectedText
      }, true);
    }

    // if the select has a title, apply it to the button, and if not, apply titleFragment text
    button.title = titleFragment.textContent.replace(/<[^>]*>?/g, '').trim();

    if (this.options.sanitize && hasContent) {
      sanitizeHtml([titleFragment], that.options.whiteList, that.options.sanitizeFn);
    }

    buttonInner.innerHTML = '';
    buttonInner.appendChild(titleFragment);

    this.syncTagEditor();

    this._emit('rendered');
  }

  usesTagEditor () {
    return this.options.liveSearch && (this.options.showSelectedTags || this.options.openOptions);
  }

  syncTagEditor () {
    if (!this.usesTagEditor()) return;

    if (this.selectedItems) {
      var selectedOptions = getSelectedOptions.call(this),
          useListStyle = this.options.selectedItemsStyle === 'list';

      this.selectedItems.innerHTML = '';
      this.selectedItems.hidden = !selectedOptions.length;
      this.selectedItems.classList.toggle('list-group', useListStyle);

      for (var i = 0; i < selectedOptions.length; i++) {
        var item = selectedOptions[i],
            selectedTag = document.createElement('button'),
            removeText = this.options.selectedTagRemoveLabel + ' ' + getOptionLabelText(item),
            content = document.createElement('span'),
            label = document.createElement('span'),
            remove = document.createElement('span'),
            icon;

        selectedTag.type = 'button';
        selectedTag.className = useListStyle
          ? 'bs-selected-item list-group-item list-group-item-action'
          : 'bs-selected-item';
        selectedTag.setAttribute('data-option-value', item.value);
        selectedTag.setAttribute('aria-label', removeText);
        selectedTag.title = removeText;

        content.className = 'bs-selected-item-content';

        if (item.icon && this.options.showIcon) {
          icon = document.createElement('span');
          icon.className = 'bs-selected-item-icon ' + this.options.iconBase + ' ' + item.icon;
          icon.setAttribute('aria-hidden', 'true');
          content.appendChild(icon);
        }

        label.className = 'bs-selected-item-label';
        label.textContent = getOptionLabelText(item);
        content.appendChild(label);

        remove.className = 'bs-selected-item-remove';
        remove.setAttribute('aria-hidden', 'true');
        remove.textContent = '\u00d7';

        selectedTag.appendChild(content);
        selectedTag.appendChild(remove);
        this.selectedItems.appendChild(selectedTag);
      }
    }

    this.syncOpenOptionButton();

    if (this.newElement && this.newElement.classList.contains(classNames.SHOW)) {
      this.setSize(true);
    }
  }

  syncOpenOptionButton () {
    if (!this.createOptionButton) return;

    var searchValue = this.searchbox ? this.searchbox.value : '',
        normalizedValue = searchValue.toString().trim(),
        shouldShow = !!normalizedValue &&
          !this.selectpicker.openOption.isCreating &&
          !this.findOptionBySearchValue(normalizedValue);

    this.createOptionButton.hidden = !shouldShow;
    this.createOptionButton.disabled = this.selectpicker.openOption.isCreating;

    if (shouldShow) {
      this.createOptionButton.textContent = this.options.openOptionsText.replace('{0}', normalizedValue);
      this.createOptionButton.setAttribute('data-search-value', normalizedValue);
    } else {
      this.createOptionButton.textContent = '';
      this.createOptionButton.removeAttribute('data-search-value');
    }
  }

  findOptionByValue (value, dataSet) {
    var options = dataSet || this.selectpicker.main.data,
        stringValue = String(value);

    for (var i = 0; i < options.length; i++) {
      var option = options[i];

      if (option.type === 'option' && String(option.value) === stringValue) {
        return option;
      }
    }

    return null;
  }

  findOptionBySearchValue (searchValue) {
    var options = this.options.source.data || this.options.source.search
          ? Object.values(this.selectpicker.optionValuesDataMap)
          : this.selectpicker.main.data,
        normalizedSearch = normalizeSearchInput(searchValue, this.options.liveSearchNormalize);

    for (var i = 0; i < options.length; i++) {
      var option = options[i];

      if (option.type !== 'option') continue;

      if (
        normalizeSearchInput(option.text, this.options.liveSearchNormalize) === normalizedSearch ||
        normalizeSearchInput(option.value, this.options.liveSearchNormalize) === normalizedSearch ||
        normalizeSearchInput(option.title, this.options.liveSearchNormalize) === normalizedSearch
      ) {
        return option;
      }
    }

    return null;
  }

  createOptionElement (optionData) {
    var option = document.createElement('option');

    option.value = optionData.value === undefined ? optionData.text : optionData.value;
    option.textContent = optionData.text === undefined ? option.value : optionData.text;

    if (optionData.className) option.className = optionData.className;
    if (optionData.title) option.title = optionData.title;
    if (optionData.content) option.setAttribute('data-content', optionData.content);
    if (optionData.tokens) option.setAttribute('data-tokens', optionData.tokens);
    if (optionData.subtext) option.setAttribute('data-subtext', optionData.subtext);
    if (optionData.icon) option.setAttribute('data-icon', optionData.icon);
    if (optionData.disabled) option.disabled = true;
    if (optionData.hidden) option.hidden = true;

    return option;
  }

  appendCreatedSearchResults (searchValue) {
    if (!this.selectpicker.createdOptions.length) return;

    var matches = [];

    for (var i = 0; i < this.selectpicker.createdOptions.length; i++) {
      var option = this.selectpicker.createdOptions[i];

      if (
        stringSearch(option, normalizeSearchInput(searchValue, this.options.liveSearchNormalize), this._searchStyle(), this.options.liveSearchNormalize) &&
        !this.findOptionByValue(option.value, this.selectpicker.search.data)
      ) {
        matches.push(option);
      }
    }

    if (matches.length) this.buildData(matches, 'search');
  }

  addCreatedOption (optionData) {
    optionData = Object.assign({}, optionData);
    optionData.value = optionData.value === undefined ? optionData.text : optionData.value;
    optionData.text = optionData.text === undefined ? optionData.value : optionData.text;

    var size = this.selectpicker.main.elements ? this.selectpicker.main.elements.length : 0,
        option = this.createOptionElement(optionData);
    optionData.option = option;

    this.element.appendChild(option);
    var builtOptions = this.buildData([optionData], 'data'),
        builtOption = builtOptions[0];

    this.buildList(size);
    this.selectpicker.createdOptions.push(builtOption);

    return builtOption;
  }

  removeSelectedTag (value) {
    var option = this.findOptionByValue(value);

    if (!option || !option.selected) return;

    var prevValue = getSelectValues.call(this);

    this.setSelected(option, false);
    changedArguments = [option.index, false, prevValue];
    triggerNative(this.element, 'change');

    if (this.options.liveSearch) this.searchbox.focus();
  }

  createOpenOption (searchValue) {
    searchValue = searchValue === undefined || searchValue === null ? '' : searchValue.toString().trim();

    if (!searchValue || this.selectpicker.openOption.isCreating) return;

    var existingOption = this.findOptionBySearchValue(searchValue);

    if (existingOption) {
      if (!existingOption.selected) {
        var prevSelectedValue = getSelectValues.call(this);

        this.setSelected(existingOption, true);
        changedArguments = [existingOption.index, true, prevSelectedValue];
        triggerNative(this.element, 'change');
      }

      if (this.options.liveSearch) this.searchbox.focus();
      return;
    }

    var that = this,
        prevValue = getSelectValues.call(this),
        createHandler = this.options.source.create;

    this.selectpicker.openOption.isCreating = true;
    this.syncOpenOptionButton();

    function finalize (createdOption) {
      that.selectpicker.openOption.isCreating = false;

      if (createdOption === undefined || createdOption === null || createdOption === false) {
        that.syncOpenOptionButton();
        return;
      }

      if (Array.isArray(createdOption)) createdOption = createdOption[0];
      if (typeof createdOption !== 'object') {
        createdOption = {
          text: createdOption,
          value: createdOption
        };
      }

      if (!createdOption.text && !createdOption.value) {
        createdOption.text = searchValue;
      }

      if (createdOption.value === undefined) createdOption.value = createdOption.text;
      if (createdOption.text === undefined) createdOption.text = createdOption.value;

      var option = that.findOptionByValue(createdOption.value) || that.findOptionBySearchValue(createdOption.text);

      if (!option) {
        option = that.addCreatedOption(createdOption);
      }

      that.setSelected(option, true);

      if (that.options.source.data) that.element.appendChild(that.selectpicker.main.optionQueue);

      if (that.searchbox) {
        that.searchbox.value = '';
      }

      that.selectpicker.search.previousValue = '';
      that.selectpicker.search.data = [];
      that.selectpicker.search.elements = [];
      that.createView(false);

      changedArguments = [option.index, true, prevValue];
      triggerNative(that.element, 'change');

      if (that.options.liveSearch) that.searchbox.focus();
    }

    if (typeof createHandler === 'function') {
      var returnedOption = createHandler.call(this, finalize, searchValue);

      if (returnedOption && typeof returnedOption.then === 'function') {
        returnedOption.then(finalize);
      } else if (returnedOption !== undefined) {
        finalize(returnedOption);
      }
    } else {
      finalize({
        text: searchValue,
        value: searchValue
      });
    }
  }

  /**
     * @param [newStyle]
     * @param [status]
     */
  setStyle (newStyle, status) {
    var button = this.button,
        newElement = this.newElement,
        style = this.options.style.trim(),
        buttonClass;

    if (this.element.getAttribute('class')) {
      var extra = this.element.getAttribute('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, '').trim();
      if (extra) newElement.classList.add.apply(newElement.classList, extra.split(/\s+/));
    }

    if (newStyle) {
      buttonClass = newStyle.trim();
    } else {
      buttonClass = style;
    }

    if (status === 'add') {
      if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
    } else if (status === 'remove') {
      if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(' '));
    } else {
      if (style) button.classList.remove.apply(button.classList, style.split(' '));
      if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
    }
  }

