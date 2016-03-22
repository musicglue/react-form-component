import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import InputGroup from './input_group';
import Field from '../field';
import formContext from '../form_context';
import validationState from '../../state';

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
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({
      id: Math.random().toString(36).substring(7),
    });
  }

  className() {
    return classNames({
      'mg-form-input': true,
      'mg-form-input-success': this.props.state.name === 'success',
      'mg-form-input-error': this.props.state.name ==='failure',
    }, this.props.className);
  }

  render() {
    const { children, label, name, onBlur, onChange, prefix, state,
      suffix, type, value, ...other } = this.props;
    return (
      <Field
        label={label}
        state={state}
        targetId={this.state.id}>
        <InputGroup prefix={prefix} suffix={suffix}>
          <input
            { ...other }
            className={this.className()}
            name={name}
            id={this.state.id}
            value={value}
            type={type}
            onChange={event => onChange(event.target.value)}
            onBlur={event => onBlur(event.target.value)} />
        </InputGroup>
        {children}
      </Field>
    );
  }
}

export default formContext(InputField);
