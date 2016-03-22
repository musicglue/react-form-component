import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Field from './field';
import formContext from './form_context';

class TextareaField extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({
      id: Math.random().toString(36).substring(7),
    });
  }

  render() {
    return (
      <Field
        label={this.props.label}
        state={this.props.state}
        targetId={this.state.id}>
        <textarea
          className={classNames('mg-form-input', this.props.className)}
          name={this.props.name}
          id={this.state.id}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
          onBlur={event => this.props.onBlur(event.target.value)} />
      </Field>
    );
  }
}

export default formContext(TextareaField);
