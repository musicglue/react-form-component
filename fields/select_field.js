import React, { Component, PropTypes } from 'react';
import Field from './field';
import formContext from './form_context';

class SelectField extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    state: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({
      id: Math.random().toString(36).substring(7),
    });
  }

  renderOptions() {
    return this.props.options.map(({ value, text }) => {
      return <option key={value} value={value}>{text}</option>;
    });
  }

  render() {
    return (
      <Field
        label={this.props.label}
        state={this.props.state}
        targetId={this.state.id}>
        <select
          className="mg-form-select"
          name={this.props.name}
          id={this.state.id}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
          onBlur={event => this.props.onBlur(event.target.value)}>
          {this.renderOptions()}
        </select>
      </Field>
    );
  }
}

export default formContext(SelectField);
