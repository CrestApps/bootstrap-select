/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.
  clickListener () {
    var that = this;

    spaceSelectFlag = false;

    this._on(this.button, 'keyup', function (e) {
      if (/(32)/.test(e.keyCode.toString(10)) && spaceSelectFlag) {
        e.preventDefault();
        spaceSelectFlag = false;
      }
    });

    function clearSelection (e) {
      if (that.multiple) {
        that.deselectAll();
      } else {
        var element = that.element,
            prevValue = element.value,
            prevIndex = element.selectedIndex,
            prevOption = element.options[prevIndex],
            prevData = prevOption ? that.selectpicker.main.data[prevOption.liIndex] : false;

        if (prevData) {
          that.setSelected(prevData, false);
        }

        element.selectedIndex = 0;

        changedArguments = [prevIndex, false, prevValue];
        triggerNative(that.element, 'change');
      }

      // remove selected styling if menu is open
      if (that.newElement.classList.contains(classNames.SHOW)) {
        if (that.options.liveSearch) {
          that.searchbox.focus();
        }

        that.createView(false);
      }
    }

    if (this.options.allowClear) {
      this._on(this.button, 'click', function (e) {
        var target = e.target,
            clearButton = that.clearButton;

        if (target === clearButton || target.parentElement === clearButton) {
          e.stopImmediatePropagation();
          clearSelection(e);
        }
      });
    }

    function setFocus () {
      if (that.options.liveSearch) {
        that.searchbox.focus();
      } else {
        that.menuInner.focus();
      }
    }

    function checkPopperExists () {
      if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state) {
        setFocus();
      } else {
        requestAnimationFrame(checkPopperExists);
      }
    }

    this._on(this.element, 'shown' + EVENT_KEY, function () {
      if (that.menuInner.scrollTop !== that.selectpicker.view.scrollTop) {
        that.menuInner.scrollTop = that.selectpicker.view.scrollTop;
      }

      requestAnimationFrame(checkPopperExists);
    });

    // ensure posinset and setsize are correct before selecting an option via a click
    this._delegate(this.menuInner, 'mouseover', 'li a', function () {
      var hoverLi = this.parentElement,
          position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
          index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi),
          hoverData = that.selectpicker.current.data[index + position0];

      that.focusItem(hoverLi, hoverData, true);
    });

    this._delegate(this.menuInner, 'click', 'li a', function (e) {
      that.onOptionClick(this, e);
    });

    this._delegate(this.menu, 'click', 'li.' + classNames.DISABLED + ' a, .' + classNames.POPOVERHEADER + ', .' + classNames.POPOVERHEADER + ' :not(.btn-close):not(.close)', function (e) {
      if (e.currentTarget === this || e.target === this) {
        e.preventDefault();
        e.stopPropagation();
        if (that.options.liveSearch && !e.target.classList.contains('btn-close') && !e.target.classList.contains('close')) {
          that.searchbox.focus();
        } else {
          that.button.focus();
        }
      }
    });

    this._delegate(this.menuInner, 'click', '.divider, .dropdown-header', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (that.options.liveSearch) {
        that.searchbox.focus();
      } else {
        that.button.focus();
      }
    });

    this._delegate(this.menu, 'click', '.' + classNames.POPOVERHEADER + ' .btn-close, .' + classNames.POPOVERHEADER + ' .close', function () {
      that.dropdown.hide();
    });

    this._delegate(this.newElement, 'click', '.bs-selected-item', function (e) {
      e.preventDefault();
      e.stopPropagation();
      that.removeSelectedTag(this.getAttribute('data-option-value'));
    });

    this._delegate(this.menu, 'click', '.bs-create-option', function (e) {
      e.preventDefault();
      e.stopPropagation();
      that.createOpenOption(this.getAttribute('data-search-value'));
    });

    if (this.searchbox) {
      this._on(this.searchbox, 'click', function (e) {
        e.stopPropagation();
      });
    }

    this._delegate(this.menu, 'click', '.actions-btn', function (e) {
      if (that.options.liveSearch) {
        that.searchbox.focus();
      } else {
        that.button.focus();
      }

      e.preventDefault();
      e.stopPropagation();

      if (this.classList.contains('bs-select-all')) {
        that.selectAll();
      } else {
        that.deselectAll();
      }
    });

    this._on(this.button, 'focus', function (e) {
      var tabindex = that.element.getAttribute('tabindex');

      // only change when button is actually focused
      if (tabindex !== undefined && tabindex !== null && e.isTrusted) {
        // apply select element's tabindex to ensure correct order is followed when tabbing to the next element
        this.setAttribute('tabindex', tabindex);
        // set element's tabindex to -1 to allow for reverse tabbing
        that.element.setAttribute('tabindex', -1);
        that.selectpicker.view.tabindex = tabindex;
      }
    });

    this._on(this.button, 'blur', function (e) {
      // revert everything to original tabindex
      if (that.selectpicker.view.tabindex !== undefined && e.isTrusted) {
        that.element.setAttribute('tabindex', that.selectpicker.view.tabindex);
        this.setAttribute('tabindex', -1);
        that.selectpicker.view.tabindex = undefined;
      }
    });

    this._on(this.element, 'change', function () {
      that.render();
      that._emit('changed', changedArguments ? {
        clickedIndex: changedArguments[0],
        isSelected: changedArguments[1],
        previousValue: changedArguments[2]
      } : null);
      changedArguments = null;
    });

    this._on(this.element, 'focus', function () {
      if (!that.options.mobile) that.button.focus();
    });
  }

  onOptionClick (clickedAnchor, e, retainActive) {
    var that = this,
        element = that.element,
        li = clickedAnchor.parentElement,
        position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
        clickedData = that.selectpicker.current.data[Array.prototype.indexOf.call(li.parentElement.children, li) + position0],
        clickedElement = clickedData.element,
        prevValue = getSelectValues.call(that),
        prevIndex = element.selectedIndex,
        prevOption = element.options[prevIndex],
        prevData = prevOption ? that.selectpicker.main.data[prevOption.liIndex] : false,
        triggerChange = true;

    // Don't close on multi choice menu
    if (that.multiple && that.options.maxOptions !== 1) {
      e.stopPropagation();
    }

    e.preventDefault();

    // Don't run if the select is disabled
    if (!that.isDisabled() && !li.classList.contains(classNames.DISABLED)) {
      var option = clickedData.option,
          state = option.selected,
          optgroupData = that.selectpicker.current.data.find(function (datum) {
            return datum.optID === clickedData.optID && datum.type === 'optgroup-label';
          }),
          optgroup = optgroupData ? optgroupData.optgroup : undefined,
          dataGetter = optgroup instanceof Element ? getOptionData.fromOption : getOptionData.fromDataSource,
          optgroupOptions = optgroup && optgroup.children,
          maxOptions = parseInt(that.options.maxOptions),
          maxOptionsGrp = optgroup && parseInt(dataGetter(optgroup, 'maxOptions')) || false;

      if (clickedElement === that.activeElement) retainActive = true;

      if (!retainActive) {
        that.prevActiveElement = that.activeElement;
        that.activeElement = undefined;
      }

      if (!that.multiple || maxOptions === 1) { // Deselect previous option if not multi select
        if (prevData) that.setSelected(prevData, false);
        that.setSelected(clickedData, true);
      } else { // Toggle the clicked option if multi select.
        that.setSelected(clickedData, !state);
        that.focusedParent.focus();

        if (maxOptions !== false || maxOptionsGrp !== false) {
          var maxReached = maxOptions < getSelectedOptions.call(that).length,
              selectedGroupOptions = 0;

          if (optgroup && optgroup.children) {
            for (var i = 0; i < optgroup.children.length; i++) {
              if (optgroup.children[i].selected) selectedGroupOptions++;
            }
          }

          var maxReachedGrp = maxOptionsGrp < selectedGroupOptions;

          if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
            if (maxOptions && maxOptions === 1) {
              element.selectedIndex = -1;
              that.setOptionStatus(true);
            } else if (maxOptionsGrp && maxOptionsGrp === 1) {
              for (var j = 0; j < optgroupOptions.length; j++) {
                var _option = optgroupOptions[j];
                that.setSelected(that.selectpicker.current.data[_option.liIndex], false);
              }

              that.setSelected(clickedData, true);
            } else {
              var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                  maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                  maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                  maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                  notify = createFromHTML('<div class="notify"></div>');

              that.menu.appendChild(notify);

              if (maxOptions && maxReached) {
                notify.appendChild(createFromHTML('<div>' + maxTxt + '</div>'));
                triggerChange = false;
                that._emit('maxReached');
              }

              if (maxOptionsGrp && maxReachedGrp) {
                notify.appendChild(createFromHTML('<div>' + maxTxtGrp + '</div>'));
                triggerChange = false;
                that._emit('maxReachedGrp');
              }

              setTimeout(function () {
                that.setSelected(clickedData, false);
              }, 10);

              notify.classList.add('fadeOut');

              setTimeout(function () {
                notify.remove();
              }, 1050);
            }
          }
        }
      }

      if (that.options.source.data) that.element.appendChild(that.selectpicker.main.optionQueue);

      if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
        that.button.focus();
      } else if (that.options.liveSearch) {
        that.searchbox.focus();
      }

      // Trigger select 'change'
      if (triggerChange) {
        if (that.multiple || prevIndex !== element.selectedIndex) {
          changedArguments = [option.index, option.selected, prevValue];
          triggerNative(that.element, 'change');
        }
      }
    }
  }

  liveSearchListener () {
    var that = this;

    this._on(this.searchbox, 'click', function (e) {
      e.stopPropagation();
    });
    this._on(this.searchbox, 'focus', function (e) {
      e.stopPropagation();
    });
    this._on(this.searchbox, 'touchend', function (e) {
      e.stopPropagation();
    });
    this._on(this.searchbox, 'keydown', function (e) {
      if (e.key === 'Enter' && that.createOptionButton && !that.createOptionButton.hidden && !that.selectpicker.current.data.length) {
        e.preventDefault();
        e.stopPropagation();
        that.createOpenOption(that.searchbox.value);
      }
    });

    this._on(this.searchbox, 'input', function () {
      var searchValue = that.searchbox.value;

      that.selectpicker.search.elements = [];
      that.selectpicker.search.data = [];

      if (searchValue) {
        that.selectpicker.search.previousValue = searchValue;

        if (that.options.source.search) {
          that.fetchData(function () {
            that.appendCreatedSearchResults(searchValue);
            that.render();
            that.buildList(undefined, true);
            that.noScroll = true;
            that.menuInner.scrollTop = 0;
            that.createView(true);
            showNoResults.call(that, that.selectpicker.search.data, searchValue);
          }, 'search', 0, searchValue);
        } else {
          var searchMatch = [],
              q = searchValue.toUpperCase(),
              cache = {},
              cacheArr = [],
              searchStyle = that._searchStyle(),
              normalizeSearch = that.options.liveSearchNormalize;

          if (normalizeSearch) q = normalizeToBase(q);

          for (var i = 0; i < that.selectpicker.main.data.length; i++) {
            var li = that.selectpicker.main.data[i];

            if (!cache[i]) {
              cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
            }

            if (cache[i] && li.headerIndex !== undefined && cacheArr.indexOf(li.headerIndex) === -1) {
              if (li.headerIndex > 0) {
                cache[li.headerIndex - 1] = true;
                cacheArr.push(li.headerIndex - 1);
              }

              cache[li.headerIndex] = true;
              cacheArr.push(li.headerIndex);

              cache[li.lastIndex + 1] = true;
            }

            if (cache[i] && li.type !== 'optgroup-label') cacheArr.push(i);
          }

          for (var j = 0, cacheLen = cacheArr.length; j < cacheLen; j++) {
            var index = cacheArr[j],
                prevIndex = cacheArr[j - 1],
                liData = that.selectpicker.main.data[index],
                liPrev = that.selectpicker.main.data[prevIndex];

            if (liData.type !== 'divider' || (liData.type === 'divider' && liPrev && liPrev.type !== 'divider' && cacheLen - 1 !== j)) {
              that.selectpicker.search.data.push(liData);
              searchMatch.push(that.selectpicker.main.elements[index]);
            }
          }

          that.activeElement = undefined;
          that.noScroll = true;
          that.menuInner.scrollTop = 0;
          that.selectpicker.search.elements = searchMatch;
          that.createView(true);
          showNoResults.call(that, searchMatch, searchValue);
        }
      } else if (that.selectpicker.search.previousValue) {
        that.menuInner.scrollTop = 0;
        that.createView(false);
      }

      that.syncOpenOptionButton();
    });
  }

  _searchStyle () {
    return this.options.liveSearchStyle || 'contains';
  }

  getValue () {
    var element = this.element;

    if (this.multiple) {
      var values = [];
      for (var i = 0; i < element.options.length; i++) {
        if (element.options[i].selected) values.push(element.options[i].value);
      }
      return values;
    }

    return element.value;
  }

