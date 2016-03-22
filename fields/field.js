import React, { Component, PropTypes } from 'react';
import validationState from '../state';

export default class Field extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string,
    targetId: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
  }

  renderValidations() {
    return validationState.case({
      failure: (errors) => {
        return <span className="mg-form-message-error">{errors.join(', ')}</span>;
      },
      _: () => null,
    }, this.props.state);
  }

  renderLabel() {
    if (!this.props.label) return null;

    return (
      <label className="mg-form-label" htmlFor={this.props.targetId} >
        {this.props.label}
        {this.renderValidations()}
      </label>
    );
  }

  render() {
    return (
      <fieldset className="mg-form-fieldset">
        {this.renderLabel()}
        {this.props.children}
      </fieldset>
    );
  }
}
