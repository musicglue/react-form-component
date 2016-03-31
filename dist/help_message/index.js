'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HelpMessage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HelpMessage(_ref) {
  var className = _ref.className;

  return _react2.default.createElement(
    'span',
    { className: 'mg-form-help-message ' + className },
    this.props.children
  );
}

HelpMessage.propTypes = {
  children: _react.PropTypes.node.isRequired,
  className: _react.PropTypes.string
};