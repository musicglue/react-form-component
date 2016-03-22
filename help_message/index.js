import React, { Component, PropTypes } from 'react';

export default class HelpMessage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  render() {
    return (
      <span className={'mg-form-help-message ' + this.props.className}>
        {this.props.children}
      </span>
    );
  }
}
