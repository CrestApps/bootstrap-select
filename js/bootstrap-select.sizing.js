/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.
  liHeight (refresh) {
    if (!refresh && (this.options.size === false || Object.keys(this.sizeInfo).length)) return;

    var newElement = elementTemplates.div.cloneNode(false),
        menu = elementTemplates.div.cloneNode(false),
        menuInner = elementTemplates.div.cloneNode(false),
        menuInnerInner = document.createElement('ul'),
        divider = elementTemplates.li.cloneNode(false),
        dropdownHeader = elementTemplates.li.cloneNode(false),
        li,
        a = elementTemplates.a.cloneNode(false),
        text = elementTemplates.span.cloneNode(false),
        header = this.options.header && this.menu.querySelectorAll('.' + classNames.POPOVERHEADER).length > 0 ? this.menu.querySelector('.' + classNames.POPOVERHEADER).cloneNode(true) : null,
        search = this.options.liveSearch && this.menu.querySelector('.bs-searchbox')
          ? this.menu.querySelector('.bs-searchbox').cloneNode(true)
          : null,
        actions = this.options.actionsBox && this.multiple && this.menu.querySelectorAll('.bs-actionsbox').length > 0 ? this.menu.querySelector('.bs-actionsbox').cloneNode(true) : null,
        doneButton = this.options.doneButton && this.multiple && this.menu.querySelectorAll('.bs-donebutton').length > 0 ? this.menu.querySelector('.bs-donebutton').cloneNode(true) : null,
        firstOption = this.element.options[0];

    this.sizeInfo.selectWidth = this.newElement.offsetWidth;

    text.className = 'text';
    a.className = 'dropdown-item ' + (firstOption ? firstOption.className : '');
    newElement.className = this.menu.parentNode.className + ' ' + classNames.SHOW;
    newElement.style.width = 0; // ensure button width doesn't affect natural width of menu when calculating
    menu.className = classNames.MENU + ' ' + classNames.SHOW;
    menuInner.className = 'inner ' + classNames.SHOW;
    menuInnerInner.className = classNames.MENU + ' inner ' + classNames.SHOW;
    divider.className = classNames.DIVIDER;
    dropdownHeader.className = 'dropdown-header';

    text.appendChild(document.createTextNode('\u200b'));

    if (this.selectpicker.current.data.length) {
      for (var i = 0; i < this.selectpicker.current.data.length; i++) {
        var data = this.selectpicker.current.data[i];
        if (data.type === 'option' && window.getComputedStyle(data.element.firstChild).display !== 'none') {
          li = data.element;
          break;
        }
      }
    } else {
      li = elementTemplates.li.cloneNode(false);
      a.appendChild(text);
      li.appendChild(a);
    }

    dropdownHeader.appendChild(text.cloneNode(true));

    if (this.selectpicker.view.widestOption) {
      menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
    }

    menuInnerInner.appendChild(li);
    menuInnerInner.appendChild(divider);
    menuInnerInner.appendChild(dropdownHeader);
    if (header) menu.appendChild(header);
    if (search) menu.appendChild(search);
    if (actions) menu.appendChild(actions);
    menuInner.appendChild(menuInnerInner);
    menu.appendChild(menuInner);
    if (doneButton) menu.appendChild(doneButton);
    newElement.appendChild(menu);

    document.body.appendChild(newElement);

    var liHeight = li.offsetHeight,
        dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0,
        headerHeight = header ? header.offsetHeight : 0,
        searchHeight = search ? search.offsetHeight : 0,
        actionsHeight = actions ? actions.offsetHeight : 0,
        doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
        dividerHeight = outerHeight(divider, true),
        menuStyle = window.getComputedStyle(menu),
        menuWidth = menu.offsetWidth,
        menuPadding = {
          vert: toInteger(menuStyle.paddingTop) +
                  toInteger(menuStyle.paddingBottom) +
                  toInteger(menuStyle.borderTopWidth) +
                  toInteger(menuStyle.borderBottomWidth),
          horiz: toInteger(menuStyle.paddingLeft) +
                  toInteger(menuStyle.paddingRight) +
                  toInteger(menuStyle.borderLeftWidth) +
                  toInteger(menuStyle.borderRightWidth)
        },
        menuExtras = {
          vert: menuPadding.vert +
                  toInteger(menuStyle.marginTop) +
                  toInteger(menuStyle.marginBottom) + 2,
          horiz: menuPadding.horiz +
                  toInteger(menuStyle.marginLeft) +
                  toInteger(menuStyle.marginRight) + 2
        },
        scrollBarWidth;

    menuInner.style.overflowY = 'scroll';

    scrollBarWidth = menu.offsetWidth - menuWidth;

    document.body.removeChild(newElement);

    this.sizeInfo.liHeight = liHeight;
    this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
    this.sizeInfo.headerHeight = headerHeight;
    this.sizeInfo.searchHeight = searchHeight;
    this.sizeInfo.actionsHeight = actionsHeight;
    this.sizeInfo.doneButtonHeight = doneButtonHeight;
    this.sizeInfo.dividerHeight = dividerHeight;
    this.sizeInfo.menuPadding = menuPadding;
    this.sizeInfo.menuExtras = menuExtras;
    this.sizeInfo.menuWidth = menuWidth;
    this.sizeInfo.menuInnerInnerWidth = menuWidth - menuPadding.horiz;
    this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
    this.sizeInfo.scrollBarWidth = scrollBarWidth;
    this.sizeInfo.selectHeight = this.newElement.offsetHeight;

    this.setPositionData();
  }

  getSelectPosition () {
    var that = this,
        winScrollTop = window.pageYOffset,
        winScrollLeft = window.pageXOffset,
        winHeight = document.documentElement.clientHeight,
        winWidth = document.documentElement.clientWidth,
        pos = offset(that.newElement);

    this.sizeInfo.selectOffsetTop = pos.top - winScrollTop;
    this.sizeInfo.selectOffsetBot = winHeight - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight;
    this.sizeInfo.selectOffsetLeft = pos.left - winScrollLeft;
    this.sizeInfo.selectOffsetRight = winWidth - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth;
  }

  setMenuSize (isAuto) {
    this.getSelectPosition();

    var selectWidth = this.sizeInfo.selectWidth,
        liHeight = this.sizeInfo.liHeight,
        headerHeight = this.sizeInfo.headerHeight,
        searchHeight = this.sizeInfo.searchHeight,
        actionsHeight = this.sizeInfo.actionsHeight,
        doneButtonHeight = this.sizeInfo.doneButtonHeight,
        divHeight = this.sizeInfo.dividerHeight,
        menuPadding = this.sizeInfo.menuPadding,
        menuInnerHeight,
        menuHeight,
        divLength = 0,
        minHeight,
        _minHeight,
        maxHeight,
        menuInnerMinHeight,
        estimate,
        isDropup;

    if (this.options.dropupAuto) {
      // Get the estimated height of the menu without scrollbars.
      estimate = liHeight * this.selectpicker.current.data.length + menuPadding.vert;

      isDropup = this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot;

      // ensure dropup doesn't change while searching (so menu doesn't bounce back and forth)
      if (this.selectpicker.isSearching === true) {
        isDropup = this.selectpicker.dropup;
      }

      this.newElement.classList.toggle(classNames.DROPUP, isDropup);
      this.selectpicker.dropup = isDropup;
    }

    if (this.options.size === 'auto') {
      _minHeight = this.selectpicker.current.data.length > 3 ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2 : 0;
      menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
      minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
      menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);

      if (this.newElement.classList.contains(classNames.DROPUP)) {
        menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
      }

      maxHeight = menuHeight;
      menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
    } else if (this.options.size && this.options.size !== 'auto' && this.selectpicker.current.elements.length > this.options.size) {
      for (var i = 0; i < this.options.size; i++) {
        if (this.selectpicker.current.data[i].type === 'divider') divLength++;
      }

      menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
      menuInnerHeight = menuHeight - menuPadding.vert;
      maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
      minHeight = menuInnerMinHeight = '';
    }

    setStyles(this.menu, {
      maxHeight: maxHeight + 'px',
      overflow: 'hidden',
      minHeight: minHeight + 'px'
    });

    setStyles(this.menuInner, {
      maxHeight: menuInnerHeight + 'px',
      overflow: 'hidden auto',
      minHeight: menuInnerMinHeight + 'px'
    });

    // ensure menuInnerHeight is always a positive number to prevent issues calculating chunkSize in createView
    this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);

    if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
      this.sizeInfo.hasScrollBar = true;
      this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;
    }

    if (this.options.dropdownAlignRight === 'auto') {
      this.menu.classList.toggle(classNames.MENUEND, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < (this.sizeInfo.totalMenuWidth - selectWidth));
    }

    if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
  }

  setSize (refresh) {
    this.liHeight(refresh);

    if (this.options.header) this.menu.style.paddingTop = 0;

    if (this.options.size !== false) {
      var that = this;

      this.setMenuSize();

      if (this.options.liveSearch) {
        this._replace('setMenuSizeInput', this.searchbox, 'input', function () {
          return that.setMenuSize();
        });
      }

      if (this.options.size === 'auto') {
        var windowSizeHandler = function () {
          return that.setMenuSize();
        };
        this._replace('setMenuSizeResize', window, 'resize', windowSizeHandler);
        this._replace('setMenuSizeScroll', window, 'scroll', windowSizeHandler);
      } else if (this.options.size && this.options.size !== 'auto' && this.selectpicker.current.elements.length > this.options.size) {
        this._removeNamed('setMenuSizeResize');
        this._removeNamed('setMenuSizeScroll');
      }
    }

    this.createView(false, true, refresh);
  }

  setWidth () {
    this.menu.style.minWidth = '';
    this.newElement.style.width = '';
    this.newElement.classList.remove('fit-width');

    if (this.options.width === 'fit') {
      this.newElement.classList.add('fit-width');
      return;
    }

    if (this.options.width && this.options.width !== 'auto') {
      this.newElement.style.width = this.options.width;
    }
  }

  selectPosition () {
    this.bsContainer = createFromHTML('<div class="bs-container" />');

    var that = this,
        container = resolveContainer(this.options.container),
        pos,
        containerPos,
        actualHeight,
        getPlacement = function (element) {
          var Dropdown = getDropdown(),
              containerPosition = {},
              // fall back to dropdown's default display setting if display is not manually set
              display = that.options.display || (Dropdown.Default ? Dropdown.Default.display : false);

          var extraClass = element.getAttribute('class').replace(/form-control|fit-width/gi, '').trim();
          if (extraClass) that.bsContainer.classList.add.apply(that.bsContainer.classList, extraClass.split(/\s+/));
          that.bsContainer.classList.toggle(classNames.DROPUP, element.classList.contains(classNames.DROPUP));
          pos = offset(element);

          if (container !== document.body) {
            containerPos = offset(container);
            var containerStyle = window.getComputedStyle(container);
            containerPos.top += toInteger(containerStyle.borderTopWidth) - container.scrollTop;
            containerPos.left += toInteger(containerStyle.borderLeftWidth) - container.scrollLeft;
          } else {
            containerPos = { top: 0, left: 0 };
          }

          actualHeight = element.classList.contains(classNames.DROPUP) ? 0 : element.offsetHeight;

          // Bootstrap 5 uses Popper for menu positioning
          if (display === 'static') {
            containerPosition.top = pos.top - containerPos.top + actualHeight;
            containerPosition.left = pos.left - containerPos.left;
          }

          containerPosition.width = element.offsetWidth;

          setStyles(that.bsContainer, {
            top: containerPosition.top !== undefined ? containerPosition.top + 'px' : '',
            left: containerPosition.left !== undefined ? containerPosition.left + 'px' : '',
            width: containerPosition.width + 'px'
          });
        };

    this._on(this.button, 'click', function () {
      if (that.isDisabled()) {
        return;
      }

      getPlacement(that.newElement);

      container.appendChild(that.bsContainer);
      that.bsContainer.classList.toggle(classNames.SHOW, !that.button.classList.contains(classNames.SHOW));
      that.bsContainer.appendChild(that.menu);
    });

    var windowHandler = function () {
      var isActive = that.newElement.classList.contains(classNames.SHOW);

      if (isActive) getPlacement(that.newElement);
    };
    this._replace('selectPositionResize', window, 'resize', windowHandler);
    this._replace('selectPositionScroll', window, 'scroll', windowHandler);

    this._on(this.element, 'hide' + EVENT_KEY, function () {
      that._menuHeight = outerHeight(that.menu);
      if (that.bsContainer.parentNode) that.bsContainer.parentNode.removeChild(that.bsContainer);
    });
  }

  createOption (data, init) {
    var optionData = !data.option ? data : data.option;

    if (optionData && optionData.nodeType !== 1) {
      var option = (init ? elementTemplates.selectedOption : elementTemplates.option).cloneNode(true);
      if (optionData.value !== undefined) option.value = optionData.value;
      option.textContent = optionData.text;

      option.selected = true;

      if (optionData.liIndex !== undefined) {
        option.liIndex = optionData.liIndex;
      } else if (!init) {
        option.liIndex = data.index;
      }

      data.option = option;

      this.selectpicker.main.optionQueue.appendChild(option);
    }
  }

  setOptionStatus (selectedOnly) {
    var that = this;

    that.noScroll = false;

    if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
      for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
        var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0],
            option = liData.option;

        if (option) {
          if (selectedOnly !== true) {
            that.setDisabled(liData);
          }

          that.setSelected(liData);
        }
      }

      // append optionQueue (documentFragment with option elements for select options)
      if (this.options.source.data) this.element.appendChild(this.selectpicker.main.optionQueue);
    }
  }

  /**
     * @param {Object} liData - the option object that is being changed
     * @param {boolean} selected - true if the option is being selected, false if being deselected
     */
  setSelected (liData, selected) {
    selected = selected === undefined ? liData.selected : selected;

    var li = liData.element,
        activeElementIsSet = this.activeElement !== undefined,
        thisIsActive = this.activeElement === li,
        prevActive,
        a,
        keepActive = thisIsActive || (selected && !this.multiple && !activeElementIsSet);

    if (selected !== undefined) {
      liData.selected = selected;
      if (liData.option) liData.option.selected = selected;
    }

    if (selected && this.options.source.data) {
      this.createOption(liData, false);
    }

    if (!li) return;

    a = li.firstChild;

    if (selected) {
      this.selectedElement = li;
    }

    li.classList.toggle('selected', selected);

    if (keepActive) {
      this.focusItem(li, liData);
      this.selectpicker.view.currentActive = li;
      this.activeElement = li;
    } else {
      this.defocusItem(li);
    }

    if (a) {
      a.classList.toggle('selected', selected);

      if (selected) {
        a.setAttribute('aria-selected', true);
      } else {
        if (this.multiple) {
          a.setAttribute('aria-selected', false);
        } else {
          a.removeAttribute('aria-selected');
        }
      }
    }

    if (!keepActive && !activeElementIsSet && selected && this.prevActiveElement !== undefined) {
      prevActive = this.prevActiveElement;

      this.defocusItem(prevActive);
    }
  }

  /**
     * @param {Object} liData - the option that is being disabled
     */
  setDisabled (liData) {
    var disabled = liData.disabled,
        li = liData.element,
        a;

    if (!li) return;

    a = li.firstChild;

    li.classList.toggle(classNames.DISABLED, disabled);

    if (a) {
      a.classList.toggle(classNames.DISABLED, disabled);

      if (disabled) {
        a.setAttribute('aria-disabled', disabled);
        a.setAttribute('tabindex', -1);
      } else {
        a.removeAttribute('aria-disabled');
        a.setAttribute('tabindex', 0);
      }
    }
  }

  isDisabled () {
    return this.element.disabled;
  }

  checkDisabled () {
    if (this.isDisabled()) {
      this.newElement.classList.add(classNames.DISABLED);
      this.button.classList.add(classNames.DISABLED);
      this.button.setAttribute('aria-disabled', true);
    } else {
      if (this.button.classList.contains(classNames.DISABLED)) {
        this.newElement.classList.remove(classNames.DISABLED);
        this.button.classList.remove(classNames.DISABLED);
        this.button.setAttribute('aria-disabled', false);
      }
    }
  }

