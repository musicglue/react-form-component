'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _formContext = require('./formContext');

var _formContext2 = _interopRequireDefault(_formContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextareaField = function (_Component) {
  _inherits(TextareaField, _Component);

  function TextareaField() {
    _classCallCheck(this, TextareaField);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextareaField).apply(this, arguments));
  }

  _createClass(TextareaField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        id: Math.random().toString(36).substring(7)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _Field2.default,
        {
          label: this.props.label,
          state: this.props.state,
          targetId: this.state.id
        },
        _react2.default.createElement('textarea', {
          className: (0, _classnames2.default)('mg-form-input', this.props.className),
          name: this.props.name,
          id: this.state.id,
          value: this.props.value,
          onChange: function onChange(event) {
            return _this2.props.onChange(event.target.value);
          },
          onBlur: function onBlur(event) {
            return _this2.props.onBlur(event.target.value);
          }
        })
      );
    }
  }]);

  return TextareaField;
}(_react.Component);

TextareaField.propTypes = {
  className: _react.PropTypes.string,
  label: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  state: _react.PropTypes.object.isRequired,
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired,
  onBlur: _react.PropTypes.func.isRequired
};
exports.default = (0, _formContext2.default)(TextareaField);