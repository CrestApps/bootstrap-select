/* eslint-disable no-undef, no-unused-vars */
// Shared ordered source fragment consumed by the Grunt JS build.

// <editor-fold desc="Constants">
var keyCodeMap = {
  32: ' ', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6',
  55: '7', 56: '8', 57: '9', 59: ';',
  65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H',
  73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P',
  81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X',
  89: 'Y', 90: 'Z',
  96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6',
  103: '7', 104: '8', 105: '9'
};

var keyCodes = {
  ESCAPE: 27,
  ENTER: 13,
  SPACE: 32,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};

var selectId = 0;

var EVENT_KEY = '.bs.select';

// Bootstrap 5 class names.
var classNames = {
  DISABLED: 'disabled',
  DIVIDER: 'dropdown-divider',
  SHOW: 'show',
  DROPUP: 'dropup',
  MENU: 'dropdown-menu',
  MENUEND: 'dropdown-menu-end',
  BUTTONCLASS: 'btn-light',
  POPOVERHEADER: 'popover-header',
  ICONBASE: '',
  TICKICON: 'bs-ok-default'
};

var Selector = {
  MENU: '.' + classNames.MENU,
  DATA_TOGGLE: 'data-bs-toggle="dropdown"'
};

var elementTemplates = {
  div: document.createElement('div'),
  span: document.createElement('span'),
  i: document.createElement('i'),
  subtext: document.createElement('small'),
  a: document.createElement('a'),
  li: document.createElement('li'),
  whitespace: document.createTextNode('\u00A0'),
  fragment: document.createDocumentFragment(),
  option: document.createElement('option')
};

elementTemplates.selectedOption = elementTemplates.option.cloneNode(false);
elementTemplates.selectedOption.setAttribute('selected', true);

elementTemplates.noResults = elementTemplates.li.cloneNode(false);
elementTemplates.noResults.className = 'no-results';

elementTemplates.a.setAttribute('role', 'option');
elementTemplates.a.className = 'dropdown-item';

elementTemplates.subtext.className = 'text-muted';

elementTemplates.text = elementTemplates.span.cloneNode(false);
elementTemplates.text.className = 'text';

elementTemplates.checkMark = elementTemplates.span.cloneNode(false);

var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + '|' + keyCodes.ARROW_DOWN);
var REGEXP_TAB_OR_ESCAPE = new RegExp('^' + keyCodes.TAB + '$|' + keyCodes.ESCAPE);

var generateOption = {
  li: function (content, classes, optgroup) {
    var li = elementTemplates.li.cloneNode(false);

    if (content) {
      if (content.nodeType === 1 || content.nodeType === 11) {
        li.appendChild(content);
      } else {
        li.innerHTML = content;
      }
    }

    if (typeof classes !== 'undefined' && classes !== '') li.className = classes;
    if (typeof optgroup !== 'undefined' && optgroup !== null) li.classList.add('optgroup-' + optgroup);

    return li;
  },

  a: function (text, classes, inline) {
    var a = elementTemplates.a.cloneNode(true);

    if (text) {
      if (text.nodeType === 11) {
        a.appendChild(text);
      } else {
        a.insertAdjacentHTML('beforeend', text);
      }
    }

    if (typeof classes !== 'undefined' && classes !== '') a.classList.add.apply(a.classList, classes.split(/\s+/));
    if (inline) a.setAttribute('style', inline);

    return a;
  },

  text: function (options, useFragment) {
    var textElement = elementTemplates.text.cloneNode(false),
        subtextElement,
        iconElement;

    if (options.content) {
      textElement.innerHTML = options.content;
    } else {
      textElement.textContent = options.text;

      if (options.icon) {
        var whitespace = elementTemplates.whitespace.cloneNode(false);

        // need to use <i> for icons in the button to prevent a breaking change
        iconElement = (useFragment === true ? elementTemplates.i : elementTemplates.span).cloneNode(false);
        iconElement.className = this.options.iconBase + ' ' + options.icon;

        elementTemplates.fragment.appendChild(iconElement);
        elementTemplates.fragment.appendChild(whitespace);
      }

      if (options.subtext) {
        subtextElement = elementTemplates.subtext.cloneNode(false);
        subtextElement.textContent = options.subtext;
        textElement.appendChild(subtextElement);
      }
    }

    if (useFragment === true) {
      while (textElement.childNodes.length > 0) {
        elementTemplates.fragment.appendChild(textElement.childNodes[0]);
      }
    } else {
      elementTemplates.fragment.appendChild(textElement);
    }

    return elementTemplates.fragment;
  },

  label: function (options) {
    var textElement = elementTemplates.text.cloneNode(false),
        subtextElement,
        iconElement;

    textElement.innerHTML = options.display;

    if (options.icon) {
      var whitespace = elementTemplates.whitespace.cloneNode(false);

      iconElement = elementTemplates.span.cloneNode(false);
      iconElement.className = this.options.iconBase + ' ' + options.icon;

      elementTemplates.fragment.appendChild(iconElement);
      elementTemplates.fragment.appendChild(whitespace);
    }

    if (options.subtext) {
      subtextElement = elementTemplates.subtext.cloneNode(false);
      subtextElement.textContent = options.subtext;
      textElement.appendChild(subtextElement);
    }

    elementTemplates.fragment.appendChild(textElement);

    return elementTemplates.fragment;
  }
};

var getOptionData = {
  fromOption: function (option, type) {
    var value;

    switch (type) {
      case 'divider':
        value = option.getAttribute('data-divider') === 'true';
        break;

      case 'text':
        value = option.textContent;
        break;

      case 'label':
        value = option.label;
        break;

      case 'style':
        value = option.style.cssText;
        break;

      case 'title':
        value = option.title;
        break;

      default:
        value = option.getAttribute('data-' + toKebabCase(type));
        break;
    }

    return value;
  },
  fromDataSource: function (option, type) {
    var value;

    switch (type) {
      case 'text':
      case 'label':
        value = option.text || option.value || '';
        break;

      default:
        value = option[type];
        break;
    }

    return value;
  }
};

function showNoResults (searchMatch, searchValue) {
  if (!searchMatch.length) {
    elementTemplates.noResults.innerHTML = this.options.noneResultsText.replace('{0}', '"' + htmlEscape(searchValue) + '"');
    this.menuInner.firstChild.appendChild(elementTemplates.noResults);
  }
}

function filterHidden (item) {
  return !(item.hidden || this.options.hideDisabled && item.disabled);
}

function getSelectedOptions () {
  var options = this.selectpicker.main.data;

  if (this.options.source.data || this.options.source.search) {
    options = Object.values(this.selectpicker.optionValuesDataMap);
  }

  var selectedOptions = options.filter(function (item) {
    if (item.selected) {
      if (this.options.hideDisabled && item.disabled) return false;
      return true;
    }

    return false;
  }, this);

  // ensure only 1 option is selected if multiple are set in the data source
  if (this.options.source.data && !this.multiple && selectedOptions.length > 1) {
    for (var i = 0; i < selectedOptions.length - 1; i++) {
      selectedOptions[i].selected = false;
    }

    selectedOptions = [ selectedOptions[selectedOptions.length - 1] ];
  }

  return selectedOptions;
}

function getSelectValues (selectedOptions) {
  var value = [],
      options = selectedOptions || getSelectedOptions.call(this),
      opt;

  for (var i = 0, len = options.length; i < len; i++) {
    opt = options[i];

    if (!opt.disabled) {
      value.push(opt.value === undefined ? opt.text : opt.value);
    }
  }

  if (!this.multiple) {
    return !value.length ? null : value[0];
  }

  return value;
}
// </editor-fold>

var changedArguments = null;

// shared flag for spacebar selection handling (mirrors original document data flag)
var spaceSelectFlag = false;

var REMOVED_OPTIONS = ['container', 'display', 'mobile', 'styleBase', 'windowPadding'];

function stripRemovedOptions (source) {
  if (!source || typeof source !== 'object') return source;

  var result = Object.assign({}, source);

  for (var i = 0; i < REMOVED_OPTIONS.length; i++) {
    delete result[REMOVED_OPTIONS[i]];
  }

  return result;
}
