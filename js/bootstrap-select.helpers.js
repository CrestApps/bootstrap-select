/* eslint-disable no-unused-vars */
// Shared ordered source fragment consumed by the Grunt JS build.

'use strict';

// Resolve Bootstrap's Dropdown component (Bootstrap 5+). It may be provided
// by the UMD factory (`bootstrap`), or available as a global.
function getDropdown () {
  var bs = bootstrap || (typeof window !== 'undefined' ? window.bootstrap : undefined);
  return (bs && bs.Dropdown) || (typeof window !== 'undefined' ? window.Dropdown : undefined);
}

// <editor-fold desc="DOM/Event helpers">
function createFromHTML (html) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html.trim();
  return wrapper.firstChild;
}

function toInteger (value) {
  return parseInt(value, 10) || 0;
}

function offset (el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

// Resolves a container option (selector string or element) to an element.
function resolveContainer (container) {
  if (!container) return null;
  return typeof container === 'string' ? document.querySelector(container) : container;
}

function outerHeight (el, includeMargin) {
  var height = el.offsetHeight;
  if (includeMargin) {
    var style = window.getComputedStyle(el);
    height += toInteger(style.marginTop) + toInteger(style.marginBottom);
  }
  return height;
}

function setStyles (el, styles) {
  for (var prop in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, prop)) {
      el.style[prop] = styles[prop];
    }
  }
}

function triggerNative (el, eventName) {
  el.dispatchEvent(new Event(eventName, { bubbles: true }));
}

// shallow array comparison
function isEqual (array1, array2) {
  return array1.length === array2.length && array1.every(function (element, index) {
    return element === array2[index];
  });
}

function toKebabCase (str) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, function ($, ofs) {
    return (ofs ? '-' : '') + $.toLowerCase();
  });
}

function toCamelCase (str) {
  return str.replace(/-([a-z])/g, function (m, letter) {
    return letter.toUpperCase();
  });
}

// Read options from data-* attributes using native values where possible.
function convertDataValue (value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === +value + '') return +value;
  if (/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(value)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return value;
}

function getDataset (el) {
  var dataset = {},
      attributes = el.attributes;

  for (var i = 0; i < attributes.length; i++) {
    var name = attributes[i].name;
    if (name.indexOf('data-') === 0) {
      dataset[toCamelCase(name.slice(5))] = convertDataValue(attributes[i].value);
    }
  }

  return dataset;
}
// </editor-fold>

// <editor-fold desc="Sanitizer">
var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

var uriAttrs = [
  'background',
  'cite',
  'href',
  'itemtype',
  'longdesc',
  'poster',
  'src',
  'xlink:href'
];

var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

var DefaultWhitelist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

// A pattern that recognizes a commonly useful subset of URLs that are safe.
var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

// A pattern that matches safe data URLs. Only matches image, video and audio types.
var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

var ParseableAttributes = ['placeholder']; // attributes to use as settings, can add others in the future

function applyLegacyOptions (element, config) {
  if (!config.placeholder) {
    var title = element.getAttribute('title');
    if (title) config.placeholder = title;
  }

  return config;
}

function allowedAttribute (attr, allowedAttributeList) {
  var attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.indexOf(attrName) !== -1) {
    if (uriAttrs.indexOf(attrName) !== -1) {
      return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
    }

    return true;
  }

  var regExp = allowedAttributeList.filter(function (value) {
    return value instanceof RegExp;
  });

  // Check if a regular expression validates the attribute.
  for (var i = 0, l = regExp.length; i < l; i++) {
    if (attrName.match(regExp[i])) {
      return true;
    }
  }

  return false;
}

function sanitizeHtml (unsafeElements, whiteList, sanitizeFn) {
  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeElements);
  }

  var whitelistKeys = Object.keys(whiteList);

  for (var i = 0, len = unsafeElements.length; i < len; i++) {
    var elements = unsafeElements[i].querySelectorAll('*');

    for (var j = 0, len2 = elements.length; j < len2; j++) {
      var el = elements[j];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(elName) === -1) {
        el.parentNode.removeChild(el);

        continue;
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

      for (var k = 0, len3 = attributeList.length; k < len3; k++) {
        var attr = attributeList[k];

        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      }
    }
  }
}
// </editor-fold>

function getAttributesObject (element) {
  var attributesObject = {},
      attrVal;

  ParseableAttributes.forEach(function (item) {
    attrVal = element.getAttribute(item);
    if (attrVal) attributesObject[item] = attrVal;
  });

  return attributesObject;
}
