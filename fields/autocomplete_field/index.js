import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import ResultList from './resultList';
import ResultMessage from './resultMessage';
import Field from '../field';
import formContext from '../form_context';
import TextField from '../inputs/text';
import Throbber from '../../../throbber';

class AutocompleteField extends Component {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    ...TextField.propTypes,
  }

  state = {
    focused: false,
    loading: false,
    value: null,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  inputClassName() {
    return classNames({
      'mg-form-autocomplete-input': true,
      'is-focused': this.state.focused,
    })
  }

  focusHandler = () => {
    this.setState({ focused: true, value: null });
  }

  changeHandler = value => {
    this.setState({ value, loading: true });
    this.props.onSearch(value);
  }

  blurHandler = () => {
    // Input blur event fires before ResultList item click event so we no-op
    // the blur handler if the cursor is currently over a ResultList item.
    if (this.isCursorOverResultList()) return;
    this.props.onChange(null, this.props.onBlur);
    this.setState({ focused: false, value: null });
  }

  selectHandler = (name, value) => {
    this.props.onChange(value, this.props.onBlur);
    this.setState({ focused: false, value: name });
  }

  isCursorOverResultList() {
    const element = findDOMNode(this.resultListRef);
    if (!element) return false;
    return element.parentElement.querySelector(':hover') === element;
  }

  renderResults() {
    const { focused, value, loading } = this.state;
    const { options } = this.props;
    if (!focused) return null;
    if (!value) return <ResultMessage value="Type something..." />;
    if (loading) return <ResultMessage value={<span><Throbber /> Loading...</span>} />;
    if (options.length === 0) return <ResultMessage value="No results." />

    return (
      <ResultList
        ref={resultList => this.resultListRef = resultList}
        options={options}
        onSelect={this.selectHandler} />
    );
  }

  render() {
    const { options, ...other } = this.props;

    return (
      <div className="mg-form-autocomplete">
        <TextField
          {...other}
          className={this.inputClassName()}
          value={this.state.value}
          onFocus={this.focusHandler}
          onChange={this.changeHandler}
          onBlur={this.blurHandler}>
          {this.renderResults()}
        </TextField>
      </div>
    );
  }
}

export default formContext(AutocompleteField);
