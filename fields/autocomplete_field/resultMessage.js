import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ResultMessage extends Component {
  static propTypes = {
    value: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className="mg-form-autocomplete-results">
        <div className="mg-form-autocomplete-results-message">
          {this.props.value}
        </div>
      </div>
    );
  }
}
