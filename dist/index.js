'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fields = exports.validations = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _validations2 = require('./validations');

var _validations = _interopRequireWildcard(_validations2);

var _fields2 = require('./fields');

var _fields = _interopRequireWildcard(_fields2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.validations = _validations;
exports.fields = _fields;

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Form)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getChildContext = function () {
      return {
        getFieldProps: function getFieldProps(name) {
          return {
            value: _this.state.values[name],
            state: _this.state.states[name] || _state2.default.neutral(),
            onChange: function onChange(value, callback) {
              return _this.setFieldValue(name, value, callback);
            },
            onBlur: function onBlur() {
              return _this.validateForm(name);
            }
          };
        },
        disabled: _this.state.disabled
      };
    }, _this.setFieldValue = function (name, value, callback) {
      var values = _ramda2.default.merge(_this.state.values, _defineProperty({}, name, value));
      var disabled = _this.isFormDisabled(values, _this.state.states);
      _this.setState({ values: values, disabled: disabled }, callback);
    }, _this.submitHandler = function (event) {
      event.preventDefault();
      _this.validateOutstanding().then(function (success) {
        if (!success) return;
        _this.props.onSubmit(_this.state.values, event);
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        disabled: true,
        values: _ramda2.default.clone(this.props.initialValues),
        states: {}
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({ disabled: true });
    }
  }, {
    key: 'setPendingValidationState',
    value: function setPendingValidationState(fields) {
      var pendingState = function pendingState(memo, fieldName) {
        return _ramda2.default.merge(memo, _defineProperty({}, fieldName, _state2.default.validating()));
      };
      var states = _ramda2.default.reduce(pendingState, this.state.states, fields);
      this.setState({ states: states });
    }
  }, {
    key: 'isFormDisabled',
    value: function isFormDisabled(values, states) {
      return !this.isFormDirty(values) || this.hasFailedValidations(states);
    }
  }, {
    key: 'isFormDirty',
    value: function isFormDirty(values) {
      return !_ramda2.default.equals(this.props.initialValues, values);
    }
  }, {
    key: 'hasFailedValidations',
    value: function hasFailedValidations(states) {
      var failedValidation = function failedValidation(state) {
        return state._name === 'failure';
      };
      return _ramda2.default.any(failedValidation, _ramda2.default.values(states));
    }
  }, {
    key: 'validateField',
    value: function validateField(fieldName, validations) {
      var _this2 = this;

      return _bluebird2.default.filter(validations, function (validation) {
        var result = validation.validate(fieldName, _this2.state.values);
        // `Promise.resolve` is necessary to 'cast' result to a promise in case
        // it is just a simple boolean.
        return _bluebird2.default.resolve(result).then(_ramda2.default.not);
      }).then(function (failed) {
        var isSuccess = failed.length === 0;
        var result = isSuccess ? _state2.default.success() : _state2.default.failure(failed.map(function (v) {
          return v.message;
        }));

        var states = _ramda2.default.merge(_this2.state.states, _defineProperty({}, fieldName, result));
        var disabled = _this2.isFormDisabled(_this2.state.values, states);

        _this2.setState({ states: states, disabled: disabled });
        return isSuccess;
      });
    }
  }, {
    key: 'validateOutstanding',
    value: function validateOutstanding() {
      var _this3 = this;

      var fieldNames = _ramda2.default.keys(this.props.validations);
      var validated = function validated(name) {
        return !!_this3.state.states[name];
      };
      var outstanding = _ramda2.default.reject(validated, fieldNames);

      this.setPendingValidationState(outstanding);

      return _bluebird2.default.all(outstanding.map(function (fieldName) {
        var validations = _this3.props.validations[fieldName];
        return _this3.validateField(fieldName, validations);
      })).then(_ramda2.default.all(_ramda2.default.identity));
    }
  }, {
    key: 'validateForm',
    value: function validateForm(initiatingField) {
      var _this4 = this;

      return _bluebird2.default.all(_ramda2.default.toPairs(this.props.validations).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var fieldName = _ref2[0];
        var validations = _ref2[1];

        var applicable = validations.filter(function (validation) {
          return validation.applicable(fieldName, initiatingField, _this4.state.values);
        });

        if (applicable.length === 0) {
          return _bluebird2.default.resolve(true);
        }

        _this4.setPendingValidationState([fieldName]);
        return _this4.validateField(fieldName, applicable);
      }));
    }
  }, {
    key: 'renderSubmitButton',
    value: function renderSubmitButton() {
      return this.props.renderSubmitButton ? _react2.default.createElement(
        'button',
        { className: 'mg-button', disabled: this.state.disabled },
        'Save'
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.submitHandler },
        this.props.children,
        this.renderSubmitButton()
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  children: _react.PropTypes.node.isRequired,
  initialValues: _react.PropTypes.object.isRequired,
  validations: _react.PropTypes.object,
  onSubmit: _react.PropTypes.func.isRequired,
  renderSubmitButton: _react.PropTypes.bool
};
Form.childContextTypes = {
  getFieldProps: _react.PropTypes.func.isRequired,
  disabled: _react.PropTypes.bool.isRequired
};
Form.defaultProps = {
  validations: {},
  renderSubmitButton: true
};
exports.default = Form;