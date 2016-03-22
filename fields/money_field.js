import React, { Component, PropTypes } from 'react';
import TextField from './inputs/text';
import formContext from './form_context';
import { formatMoney, toCents } from '../../lib/money';

class MoneyField extends Component {
  static propTypes = {
    currency: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    ...TextField.propTypes,
  }

  componentWillMount() {
    this.setState({
      value: this.format(this.props.value, this.props.currency),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.format(nextProps.value, nextProps.currency),
    });
  }

  state = {
    value: null,
  }

  timeoutId = null

  format(cents, currency) {
    return formatMoney(cents, currency, {
      symbol: '',
      format: {pos: '%v', neg: '-%v', zero: '%v'},
    });
  }

  changeHandler = value => {
    window.clearTimeout(this.timeoutId);
    const cents = toCents(value, this.props.currency);
    const updateValue = () => this.props.onChange(cents, this.props.onBlur);

    if (this.format(cents, this.props.currency) === value) {
      updateValue();
    } else {
      this.setState({ value });
      this.timeoutId = window.setTimeout(updateValue, 1000);
    }
  }

  blurHandler = value => {
    window.clearTimeout(this.timeoutId);
    const cents = toCents(value, this.props.currency);
    this.props.onChange(cents, this.props.onBlur);
  }

  render() {
    return (
      <TextField
        {...this.props}
        value={this.state.value}
        suffix={this.props.currency}
        onChange={this.changeHandler}
        onBlur={this.blurHandler} />
    );
  }
}

export default formContext(MoneyField);
