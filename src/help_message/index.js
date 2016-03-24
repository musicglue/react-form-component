import React, { PropTypes } from 'react';

export default function HelpMessage({ className }) {
  return (
    <span className={`mg-form-help-message ${className}`}>
      {this.props.children}
    </span>
  );
}

HelpMessage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
