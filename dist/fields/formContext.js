'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (WrappedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (value, callback) {
        if (_this.props.onChange) {
          _this.props.onChange(value, _this.fieldProps().onChange, callback);
        } else {
          _this.fieldProps().onChange(value, callback);
        }
      }, _this.onBlur = function (value) {
        if (_this.props.onBlur) {
          _this.props.onBlur(value, _this.fieldProps().onBlur);
        } else {
          _this.fieldProps().onBlur(value);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
      key: 'fieldProps',
      value: function fieldProps() {
        return this.context.getFieldProps(this.props.name);
      }
    }, {
      key: 'render',
      value: function render() {
        var value = this.props.value === undefined ? this.fieldProps().value : this.props.value;

        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          value: value,
          state: this.fieldProps().state,
          onChange: this.onChange,
          onBlur: this.onBlur
        }));
      }
    }]);

    return _class;
  }(_react.Component), _class.propTypes = {
    value: _react.PropTypes.any,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func,
    onBlur: _react.PropTypes.func
  }, _class.contextTypes = {
    getFieldProps: _react2.default.PropTypes.func.isRequired
  }, _temp2;
};