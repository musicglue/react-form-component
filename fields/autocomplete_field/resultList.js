import React, { Component, PropTypes } from 'react';
import { propOr } from 'ramda';
import classNames from 'classnames';

export default class ResultList extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  render() {
    const tryId = maybeObj => propOr(maybeObj, 'id')(maybeObj);

    return (
      <ol
        className="mg-form-autocomplete-results">
        {this.props.options.map(({ name, value }) => {
          return (
            <li
              className="mg-form-autocomplete-results-item"
              key={tryId(value)}
              onClick={() => this.props.onSelect(name, value)}>
              {name}
            </li>
          );
        })}
      </ol>
    );
  }
}
