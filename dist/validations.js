'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegexValidation = exports.MatchesValidation = exports.PriceAboveMinimumValidation = exports.RequiredValidation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-unused-vars: [2, {"args": "after-used", "argsIgnorePattern": "^values$"}] */


var _ramda = require('ramda');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequiredValidation = exports.RequiredValidation = function () {
  function RequiredValidation() {
    _classCallCheck(this, RequiredValidation);

    this.message = 'You must enter a value';
  }

  _createClass(RequiredValidation, [{
    key: 'applicable',
    value: function applicable(selfField, blurredField, values) {
      return selfField === blurredField;
    }
  }, {
    key: 'validate',
    value: function validate(selfField, values) {
      return !(0, _ramda.isNil)(values[selfField]) && !(0, _ramda.isEmpty)(values[selfField]);
    }
  }]);

  return RequiredValidation;
}();

var PriceAboveMinimumValidation = exports.PriceAboveMinimumValidation = function () {
  function PriceAboveMinimumValidation(minimumPrice) {
    _classCallCheck(this, PriceAboveMinimumValidation);

    this._minimumPrice = minimumPrice;
    this.message = 'The amount must be higher than the minimum price of ' + minimumPrice;
  }

  _createClass(PriceAboveMinimumValidation, [{
    key: 'applicable',
    value: function applicable(selfField, blurredField, values) {
      return selfField === blurredField;
    }
  }, {
    key: 'validate',
    value: function validate(selfField, values) {
      return values[selfField] >= this._minimumPrice;
    }
  }]);

  return PriceAboveMinimumValidation;
}();

var MatchesValidation = exports.MatchesValidation = function () {
  function MatchesValidation(target, message) {
    _classCallCheck(this, MatchesValidation);

    this._target = target;
    this._message = message || target;
  }

  _createClass(MatchesValidation, [{
    key: 'applicable',
    value: function applicable(selfField, blurredField, values) {
      var current = selfField === blurredField;
      var target = this._target === blurredField;
      var empty = values[selfField] && values[selfField].length === 0;

      return current || target && !empty;
    }
  }, {
    key: 'validate',
    value: function validate(selfField, values) {
      return values[selfField] === values[this._target];
    }
  }, {
    key: 'message',
    get: function get() {
      return 'Must match ' + this._message;
    }
  }]);

  return MatchesValidation;
}();

var RegexValidation = exports.RegexValidation = function () {
  function RegexValidation(regex, message) {
    _classCallCheck(this, RegexValidation);

    this._regex = regex;
    this.message = message;
  }

  _createClass(RegexValidation, [{
    key: 'applicable',
    value: function applicable(selfField, blurredField, values) {
      return selfField === blurredField;
    }
  }, {
    key: 'validate',
    value: function validate(selfField, values) {
      return this._regex.test(values[selfField]);
    }
  }]);

  return RegexValidation;
}();