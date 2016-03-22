import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import Promise from 'bluebird';
import validationState from './state';

export default class Form extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    initialValues: PropTypes.object.isRequired,
    validations: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    renderSubmitButton: PropTypes.bool,
  }

  static childContextTypes = {
    getFieldProps: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    validations: {},
    renderSubmitButton: true,
  }

  getChildContext = () => (
    {
      getFieldProps: (name) => (
        {
          value: (this.state.values[name] || null),
          state: (this.state.states[name] || validationState.neutral()),
          onChange: (value, callback) => this.setFieldValue(name, value, callback),
          onBlur: () => this.validateForm(name),
        }
      ),
      disabled: this.state.disabled,
    }
  )

  componentWillMount() {
    this.setState({
      disabled: true,
      values: R.clone(this.props.initialValues),
      states: {},
    });
  }

  componentWillReceiveProps() {
    this.setState({ disabled: true });
  }

  setFieldValue = (name, value, callback) => {
    const values = R.merge(this.state.values, { [name]: value });
    const disabled = this.isFormDisabled(values, this.state.states);
    this.setState({ values, disabled }, callback);
  }

  setPendingValidationState(fields) {
    const pendingState = (memo, fieldName) =>
      R.merge(memo, { [fieldName]: validationState.validating() });
    const states = R.reduce(pendingState, this.state.states, fields);
    this.setState({ states });
  }

  isFormDisabled(values, states) {
    return !this.isFormDirty(values) || this.hasFailedValidations(states);
  }

  isFormDirty(values) {
    return !R.equals(this.props.initialValues, values);
  }

  hasFailedValidations(states) {
    const failedValidation = state => state.name === 'Failure';
    return R.any(failedValidation, R.values(states));
  }

  validateField(fieldName, validations) {
    return Promise.filter(validations, validation => {
      const result = validation.validate(fieldName, this.state.values);
      // `Promise.resolve` is necessary to 'cast' result to a promise in case
      // it is just a simple boolean.
      return Promise.resolve(result).then(R.not);
    }).then(failed => {
      const isSuccess = failed.length === 0;
      const result = isSuccess
        ? validationState.success()
        : validationState.failure(failed.map(v => v.message));

      const states = R.merge(this.state.states, { [fieldName]: result });
      const disabled = this.isFormDisabled(this.state.values, states);

      this.setState({ states, disabled });
      return isSuccess;
    });
  }

  validateOutstanding() {
    const fieldNames = R.keys(this.props.validations);
    const validated = name => !!this.state.states[name];
    const outstanding = R.reject(validated, fieldNames);

    this.setPendingValidationState(outstanding);

    return Promise.all(outstanding.map(fieldName => {
      const validations = this.props.validations[fieldName];
      return this.validateField(fieldName, validations);
    })).then(R.all(R.identity));
  }

  validateForm(initiatingField) {
    return Promise.all(R.toPairs(this.props.validations).map(([fieldName, validations]) => {
      const applicable = validations
        .filter(validation =>
          validation.applicable(fieldName, initiatingField, this.state.values));

      if (applicable.length === 0) {
        return Promise.resolve(true);
      }

      this.setPendingValidationState([fieldName]);
      return this.validateField(fieldName, applicable);
    }));
  }

  submitHandler = event => {
    event.preventDefault();
    this.validateOutstanding().then(success => {
      if (!success) return;
      this.props.onSubmit(this.state.values, event);
    });
  }

  renderSubmitButton() {
    return this.props.renderSubmitButton
      ? <button className="mg-button" disabled={this.state.disabled}>Save</button>
      : null;
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.children}
        {this.renderSubmitButton()}
      </form>
    );
  }
}
