'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = TelField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputField = require('./InputField');

var _InputField2 = _interopRequireDefault(_InputField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TelField(props) {
  return _react2.default.createElement(_InputField2.default, _extends({}, props, { type: 'tel' }));
}