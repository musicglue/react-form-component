'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unionType = require('union-type');

var _unionType2 = _interopRequireDefault(_unionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _unionType2.default)({ neutral: [], validating: [], success: [], failure: [Array] });