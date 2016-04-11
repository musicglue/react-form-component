import React, { Component, PropTypes } from 'react';
import { formatMoney, toCents } from '..//lib/money';
import Field from './Field';
import formContext from './formContext';
import classNames from 'classnames';

class MoneyField extends Component {
  static propTypes = {
    className: PropTypes.string,
    currency: PropTypes.string,
    label: PropTypes.string,
    minPrice: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    value: PropTypes.number,
  }

  componentWillMount() {
    this.setState({
      id: Math.random().toString(36).substring(7),
      visibleId: Math.random().toString(36).substring(7),
      value: this.format(this.props.value, this.props.currency),
    });
  }

  format(cents, currency) {
    return formatMoney(cents, currency, {
      symbol: '',
      format: { pos: '%v', neg: '-%v', zero: '%v' },
    });
  }

  blurHandler = event => {
    const cents = toCents(event.target.value, this.props.currency);
    this.props.onBlur(cents);
    this.setState({ value: this.format(cents, this.props.currency) });
  }

  changeHandler = event => {
    this.props.onChange(toCents(event.target.value, this.props.currency));
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Field label={this.props.label} state={this.props.state} targetId={this.state.id}>
        <div className="mg-form-field">
          <span className="mg-form-field-addon">{this.props.currency}</span>
          <input
            type="hidden"
            name={this.props.name}
            id={this.state.id}
            value={this.props.value}
          />
          <input
            className={classNames('mg-form-input', this.props.className)}
            id={this.state.visibleId}
            value={this.state.value}
            suffix={this.props.currency}
            onBlur={this.blurHandler}
            onChange={this.changeHandler}
          />
        </div>
      </Field>
    );
  }
}

export default formContext(MoneyField);
