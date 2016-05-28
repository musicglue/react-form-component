import React, { Component, PropTypes } from 'react';

export default WrappedComponent => class extends Component {
  static propTypes = {
    value: PropTypes.any,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static contextTypes = {
    getFieldProps: React.PropTypes.func.isRequired,
  }

  fieldProps() {
    return this.context.getFieldProps(this.props.name);
  }

  onChange = (value, callback) => {
    if (this.props.onChange) {
      this.props.onChange(value, this.fieldProps().onChange, callback);
    } else {
      this.fieldProps().onChange(value, callback);
    }
  }

  onBlur = value => {
    if (this.props.onBlur) {
      this.props.onBlur(value, this.fieldProps().onBlur);
    } else {
      this.fieldProps().onBlur(value);
    }
  }

  render() {
    const value = this.props.value === undefined
      ? this.fieldProps().value
      : this.props.value;

    return (
      <WrappedComponent
        {...this.props}
        value={value}
        state={this.fieldProps().state}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
};
