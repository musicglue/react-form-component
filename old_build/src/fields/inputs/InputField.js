import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import InputGroup from './InputGroup';
import Field from '../Field';
import formContext from '../formContext';

class InputField extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    state: PropTypes.object.isRequired,
    suffix: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
    valueAttr: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({
      id: Math.random().toString(36).substring(7),
    });
  }

  className() {
    const { state: { _name: validationState } } = this.props;
    const classes = classNames({
      'mg-form-input': true,
      'mg-form-input-success': validationState === 'success',
      'mg-form-input-error': validationState === 'failure',
    }, this.props.className);

    return classes;
  }

  render() {
    const { children, label, name, onBlur, onChange, prefix, state,
      suffix, type, value, valueAttr = 'value', ...other } = this.props;
    return (
      <Field
        label={label}
        state={state}
        targetId={this.state.id}
      >
        <InputGroup prefix={prefix} suffix={suffix}>
          <input
            { ...other }
            { ...{ [valueAttr]: value } }
            className={this.className()}
            name={name}
            id={this.state.id}
            type={type}
            onChange={event => onChange(event.target[valueAttr])}
            onBlur={event => onBlur(event.target[valueAttr])}
          />
        </InputGroup>
        {children}
      </Field>
    );
  }
}

export default formContext(InputField);
