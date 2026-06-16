/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.

class Selectpicker {
  constructor (element, options) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || element.tagName !== 'SELECT') {
      throw new TypeError('Selectpicker requires a select element or selector.');
    }

    this.element = element;
    this.newElement = null;
    this.button = null;
    this.menu = null;
    this.options = Selectpicker._buildConfig(element, options || {});

    // tracked event listeners for clean teardown
    this._listeners = [];
    this._named = {};

    this.selectpicker = {
      main: {
        data: [],
        optionQueue: elementTemplates.fragment.cloneNode(false),
        hasMore: false
      },
      search: {
        data: [],
        hasMore: false
      },
      current: {}, // current is either equal to main or search depending on if a search is in progress
      view: {},
      // map of option values and their respective data (only used in conjunction with options.source)
      optionValuesDataMap: {},
      createdOptions: [],
      openOption: {
        isCreating: false
      },
      isSearching: false,
      keydown: {
        keyHistory: '',
        resetKeyHistory: {
          start: () => {
            return setTimeout(() => {
              this.selectpicker.keydown.keyHistory = '';
            }, 800);
          }
        }
      }
    };

    this.sizeInfo = {};

    this.init();

    instanceMap.set(element, this);
  }

  // <editor-fold desc="Event helpers">
  _on (el, type, handler, options) {
    el.addEventListener(type, handler, options);
    this._listeners.push({ el: el, type: type, handler: handler, options: options });
    return handler;
  }

  _delegate (el, type, selector, handler, options) {
    var listener = function (e) {
      var target = e.target.closest(selector);
      if (target && el.contains(target)) {
        handler.call(target, e);
      }
    };
    return this._on(el, type, listener, options);
  }

  _emit (name, detail) {
    var event = new CustomEvent(name + EVENT_KEY, {
      bubbles: true,
      cancelable: true,
      detail: detail || null
    });
    this.element.dispatchEvent(event);
    return event;
  }

  // adds an event listener that replaces any previously-registered listener under `key`
  _replace (key, el, type, handler, options) {
    this._removeNamed(key);
    el.addEventListener(type, handler, options);
    this._named[key] = { el: el, type: type, handler: handler, options: options };
  }

  _removeNamed (key) {
    var prev = this._named[key];
    if (prev) {
      prev.el.removeEventListener(prev.type, prev.handler, prev.options);
      delete this._named[key];
    }
  }
  // </editor-fold>

  init () {
    var that = this,
        id = this.element.getAttribute('id'),
        element = this.element,
        form = element.form;

    selectId++;
    this.selectId = 'bs-select-' + selectId;

    element.classList.add('bs-select-hidden');

    this.multiple = this.element.multiple;
    this.autofocus = this.element.autofocus;

    if (element.classList.contains('show-tick')) {
      this.options.showTick = true;
    }

    this.newElement = this.createDropdown();

    // insert newElement after element, then move element to be the first child of newElement
    element.parentNode.insertBefore(this.newElement, element.nextSibling);
    this.newElement.insertBefore(element, this.newElement.firstChild);

    // ensure select is associated with form element if it got unlinked after moving it inside newElement
    if (form && element.form === null) {
      if (!form.id) form.id = 'form-' + this.selectId;
      element.setAttribute('form', form.id);
    }

    this.button = this.newElement.querySelector(':scope > button');
    if (this.options.allowClear) this.clearButton = this.button.querySelector('.bs-select-clear-selected');
    this.menu = this.newElement.querySelector(':scope > ' + Selector.MENU);
    this.menuInner = this.menu.querySelector('.inner');
    this.searchbox = this.menu.querySelector('input');
    this.selectedItems = this.newElement.querySelector(':scope > .bs-selected-items-external') || this.menu.querySelector('.bs-selected-items');
    this.createOptionButton = this.menu.querySelector('.bs-create-option');

    element.classList.remove('bs-select-hidden');

    this.fetchData(function () {
      that.render(true);
      that.buildList();

      requestAnimationFrame(function () {
        that._emit('loaded');
      });
    });

    if (this.options.dropdownAlignRight === true) this.menu.classList.add(classNames.MENUEND);

    if (typeof id !== 'undefined' && id !== null) {
      this.button.setAttribute('data-id', id);
    }

    this.checkDisabled();
    this.clickListener();

    var Dropdown = getDropdown();
    this.dropdown = new Dropdown(this.button);

    // store a reference to the instance for delegated handlers
    this.newElement.bootstrapSelectInstance = this;
    this.menu.bootstrapSelectInstance = this;

    if (this.options.liveSearch) {
      this.liveSearchListener();
      this.focusedParent = this.searchbox;
    } else {
      this.focusedParent = this.menuInner;
    }

    this.setStyle();
    this.setWidth();
    this._on(this.element, 'hide' + EVENT_KEY, function () {
      if (that.isVirtual()) {
        // empty menu on close
        var menuInner = that.menuInner,
            emptyMenu = menuInner.firstChild.cloneNode(false);

        // replace the existing UL with an empty one - this is faster than emptying it
        menuInner.replaceChild(emptyMenu, menuInner.firstChild);
        menuInner.scrollTop = 0;
      }
    });

    // re-emit Bootstrap dropdown events as bootstrap-select events
    this._on(this.newElement, 'hide.bs.dropdown', function (e) {
      that._emit('hide', { bsEvent: e });
    });
    this._on(this.newElement, 'hidden.bs.dropdown', function (e) {
      that._emit('hidden', { bsEvent: e });
    });
    this._on(this.newElement, 'show.bs.dropdown', function (e) {
      that.onShow(e);
      that._emit('show', { bsEvent: e });
    });
    this._on(this.newElement, 'shown.bs.dropdown', function (e) {
      that._emit('shown', { bsEvent: e });
    });

    if (element.hasAttribute('required')) {
      this._on(this.element, 'invalid', function () {
        that.button.classList.add('bs-invalid');

        var onShownInvalid = function () {
          // set the value to hide the validation message in Chrome when menu is opened
          triggerNative(that.element, 'change');
          that.element.removeEventListener('shown' + EVENT_KEY, onShownInvalid);
        };
        that._on(that.element, 'shown' + EVENT_KEY, onShownInvalid);

        var onRendered = function () {
          // if select is no longer invalid, remove the bs-invalid class
          if (that.element.validity.valid) that.button.classList.remove('bs-invalid');
          that.element.removeEventListener('rendered' + EVENT_KEY, onRendered);
        };
        that._on(that.element, 'rendered' + EVENT_KEY, onRendered);

        var onBlur = function () {
          that.element.focus();
          that.element.blur();
          that.button.removeEventListener('blur' + EVENT_KEY, onBlur);
        };
        that._on(that.button, 'blur' + EVENT_KEY, onBlur);
      });
    }

    if (form) {
      this._on(form, 'reset', function () {
        requestAnimationFrame(function () {
          that.render();
        });
      });
    }
  }

  createDropdown () {
    // If we are multiple or showTick option is set, then add the show-tick class
    var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
        showSelectedTags = this.options.showSelectedTags ? ' show-selected-tags' : '',
        selectedItemsStyle = this.options.selectedItemsStyle === 'list' ? ' selected-items-style-list' : '',
        selectionIndicator = this.options.selectionIndicator === 'checkbox' ? ' selection-indicator-checkbox' : '',
        multiselectable = this.multiple ? ' aria-multiselectable="true"' : '',
        autofocus = this.autofocus ? ' autofocus' : '',
        liveSearchPlaceholder = this.options.liveSearchPlaceholder;

    if (liveSearchPlaceholder === null && (this.options.showSelectedTags || this.options.openOptions)) {
      liveSearchPlaceholder = this.options.placeholder || 'Search';
    }

    // Elements
    var drop,
        header = '',
        searchbox = '',
        actionsbox = '',
        donebutton = '',
        clearButton = '';

    if (this.options.header) {
      header =
          '<div class="' + classNames.POPOVERHEADER + '">' +
            '<button type="button" class="btn-close" aria-label="Close"></button>' +
              this.options.header +
          '</div>';
    }

    if (this.options.liveSearch) {
      searchbox =
          '<div class="bs-searchbox">' +
            '<input type="search" class="form-control" autocomplete="off"' +
              (
                liveSearchPlaceholder === null ? ''
                :
                ' placeholder="' + htmlEscape(liveSearchPlaceholder) + '"'
              ) +
              ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list">' +
            (this.options.openOptions
              ? '<button type="button" class="bs-create-option dropdown-item" hidden></button>'
              : '') +
          '</div>';
    }

    if (this.multiple && this.options.actionsBox) {
      actionsbox =
          '<div class="bs-actionsbox">' +
            '<div class="btn-group btn-group-sm">' +
              '<button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' +
                this.options.selectAllText +
              '</button>' +
              '<button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' +
                this.options.deselectAllText +
              '</button>' +
            '</div>' +
          '</div>';
    }

    if (this.multiple && this.options.doneButton) {
      donebutton =
          '<div class="bs-donebutton">' +
            '<div class="btn-group">' +
              '<button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' +
                this.options.doneButtonText +
              '</button>' +
            '</div>' +
          '</div>';
    }

    if (this.options.allowClear) {
      clearButton = '<span class="bs-select-clear-selected" title="' + this.options.deselectAllText + '"><span>&times;</span>';
    }

    drop =
        '<div class="dropdown bootstrap-select' + showTick + showSelectedTags + selectedItemsStyle + selectionIndicator + '">' +
          '<button type="button" tabindex="-1" class="' +
            'btn dropdown-toggle" ' +
            Selector.DATA_TOGGLE +
            autofocus +
            ' role="combobox" aria-owns="' +
            this.selectId +
            '" aria-haspopup="listbox" aria-expanded="false">' +
            '<div class="filter-option">' +
              '<div class="filter-option-inner">' +
                '<div class="filter-option-inner-inner">&nbsp;</div>' +
              '</div> ' +
            '</div>' +
            clearButton +
            '</span>' +
          '</button>' +
          '<div class="' + classNames.MENU + '">' +
            header +
            searchbox +
            actionsbox +
            '<div class="inner ' + classNames.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + multiselectable + '>' +
                '<ul class="' + classNames.MENU + ' inner ' + classNames.SHOW + '" role="presentation">' +
                '</ul>' +
            '</div>' +
            donebutton +
          '</div>' +
          (this.multiple && this.options.showSelectedTags
            ? '<div class="bs-selected-items bs-selected-items-external" hidden></div>'
            : '') +
        '</div>';

    return createFromHTML(drop);
  }

