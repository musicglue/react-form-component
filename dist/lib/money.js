'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.toCents = toCents;
exports.formatMoney = formatMoney;

var _accounting = require('accounting');

var _currency = require('js-money/lib/currency');

var _currency2 = _interopRequireDefault(_currency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findCurrency(currency) {
  var result = _currency2.default[currency];
  if (result) return result;
  throw new Error('Unsupported currency \'' + currency + '\'');
}

function toCents(value, currency) {
  var _findCurrency = findCurrency(currency);

  var precision = _findCurrency.decimal_digits;

  return Math.round((0, _accounting.unformat)(value) * Math.pow(10, precision));
}

function formatMoney(cents, currency, options) {
  var defaults = { format: { pos: '%s%v', neg: '-%s%v', zero: '%s%v' } };
  var opts = _extends({}, defaults, options);

  var _findCurrency2 = findCurrency(currency);

  var symbol = _findCurrency2.symbol;
  var precision = _findCurrency2.decimal_digits;

  var amount = cents / Math.pow(10, precision);

  return (0, _accounting.formatMoney)(amount, {
    symbol: symbol,
    precision: precision,
    format: opts.format
  });
}