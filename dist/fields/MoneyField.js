'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _money = require('..//lib/money');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _formContext = require('./formContext');

var _formContext2 = _interopRequireDefault(_formContext);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoneyField = function (_Component) {
  _inherits(MoneyField, _Component);

  function MoneyField() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, MoneyField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MoneyField)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.blurHandler = function (event) {
      var cents = (0, _money.toCents)(event.target.value, _this.props.currency);
      _this.props.onBlur(cents);
      _this.setState({ value: _this.format(cents, _this.props.currency) });
    }, _this.changeHandler = function (event) {
      _this.props.onChange((0, _money.toCents)(event.target.value, _this.props.currency));
      _this.setState({ value: event.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MoneyField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        id: Math.random().toString(36).substring(7),
        visibleId: Math.random().toString(36).substring(7),
        value: this.format(this.props.value, this.props.currency)
      });
    }
  }, {
    key: 'format',
    value: function format(cents, currency) {
      return (0, _money.formatMoney)(cents, currency, {
        symbol: '',
        format: { pos: '%v', neg: '-%v', zero: '%v' }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Field2.default,
        { label: this.props.label, state: this.props.state, targetId: this.state.id },
        _react2.default.createElement(
          'div',
          { className: 'mg-form-field' },
          _react2.default.createElement(
            'span',
            { className: 'mg-form-field-addon' },
            this.props.currency
          ),
          _react2.default.createElement('input', {
            type: 'hidden',
            name: this.props.name,
            id: this.state.id,
            value: this.props.value
          }),
          _react2.default.createElement('input', {
            className: (0, _classnames2.default)('mg-form-input', this.props.className),
            id: this.state.visibleId,
            value: this.state.value,
            suffix: this.props.currency,
            onBlur: this.blurHandler,
            onChange: this.changeHandler
          })
        )
      );
    }
  }]);

  return MoneyField;
}(_react.Component);

MoneyField.propTypes = {
  className: _react.PropTypes.string,
  currency: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired,
  onBlur: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.number,
  name: _react.PropTypes.string,
  label: _react.PropTypes.string,
  minPrice: _react.PropTypes.number
};
exports.default = (0, _formContext2.default)(MoneyField);