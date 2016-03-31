'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Field;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getValidationState(map, state) {
  var creator = map[state.name];
  return creator ? creator(state[0]) : null;
}

function renderValidationMessage(validationState) {
  return getValidationState({
    failure: function failure(errors) {
      return _react2.default.createElement(
        'span',
        { className: 'mg-form-message-error' },
        errors.join(', ')
      );
    },
    validating: function validating() {
      return _react2.default.createElement('span', { className: 'mg-form-validation-active' });
    },
    neutral: function neutral() {
      return _react2.default.createElement('span', { className: 'mg-form-validation-neutral' });
    }
  }, validationState);
}

function renderLabel(label, validationState, targetId) {
  return label ? _react2.default.createElement(
    'label',
    { className: 'mg-form-label', htmlFor: targetId },
    label,
    renderValidationMessage(validationState)
  ) : null;
}

function Field(_ref) {
  var children = _ref.children;
  var label = _ref.label;
  var state = _ref.state;
  var targetId = _ref.targetId;

  return _react2.default.createElement(
    'fieldset',
    { className: 'mg-form-fieldset' },
    renderLabel(label, state, targetId),
    children
  );
}

Field.propTypes = {
  children: _react.PropTypes.node.isRequired,
  label: _react.PropTypes.string,
  state: _react.PropTypes.object.isRequired,
  targetId: _react.PropTypes.string.isRequired
};