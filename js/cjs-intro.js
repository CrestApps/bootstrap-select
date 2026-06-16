'use strict';

var bootstrap;

try {
  bootstrap = require('bootstrap');
} catch (error) {
  bootstrap = undefined;
}

var __SELECTPICKER_EXPOSE_GLOBAL__ = false;

var Selectpicker = (function (bootstrap) {
