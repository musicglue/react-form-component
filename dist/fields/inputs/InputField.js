'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InputGroup = require('./InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _formContext = require('../formContext');

var _formContext2 = _interopRequireDefault(_formContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputField = function (_Component) {
  _inherits(InputField, _Component);

  function InputField() {
    _classCallCheck(this, InputField);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InputField).apply(this, arguments));
  }

  _createClass(InputField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        id: Math.random().toString(36).substring(7)
      });
    }
  }, {
    key: 'className',
    value: function className() {
      return (0, _classnames2.default)({
        'mg-form-input': true,
        'mg-form-input-success': this.props.state.name === 'success',
        'mg-form-input-error': this.props.state.name === 'failure'
      }, this.props.className);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var label = _props.label;
      var name = _props.name;
      var _onBlur = _props.onBlur;
      var _onChange = _props.onChange;
      var prefix = _props.prefix;
      var state = _props.state;
      var suffix = _props.suffix;
      var type = _props.type;
      var value = _props.value;
      var _props$valueAttr = _props.valueAttr;
      var valueAttr = _props$valueAttr === undefined ? 'value' : _props$valueAttr;

      var other = _objectWithoutProperties(_props, ['children', 'label', 'name', 'onBlur', 'onChange', 'prefix', 'state', 'suffix', 'type', 'value', 'valueAttr']);

      return _react2.default.createElement(
        _Field2.default,
        {
          label: label,
          state: state,
          targetId: this.state.id
        },
        _react2.default.createElement(
          _InputGroup2.default,
          { prefix: prefix, suffix: suffix },
          _react2.default.createElement('input', _extends({}, other, _defineProperty({}, valueAttr, value), {
            className: this.className(),
            name: name,
            id: this.state.id,
            type: type,
            onChange: function onChange(event) {
              return _onChange(event.target[valueAttr]);
            },
            onBlur: function onBlur(event) {
              return _onBlur(event.target[valueAttr]);
            }
          }))
        ),
        children
      );
    }
  }]);

  return InputField;
}(_react.Component);

InputField.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  label: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  placeholder: _react.PropTypes.string,
  prefix: _react.PropTypes.string,
  state: _react.PropTypes.object.isRequired,
  suffix: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string]),
  valueAttr: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired,
  onBlur: _react.PropTypes.func.isRequired
};
exports.default = (0, _formContext2.default)(InputField);