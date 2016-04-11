/* eslint no-unused-vars: [2, {"args": "after-used", "argsIgnorePattern": "^values$"}] */
import { isEmpty, isNil } from 'ramda';

export class RequiredValidation {
  message = 'You must enter a value';

  applicable(selfField, blurredField, values) {
    return selfField === blurredField;
  }

  validate(selfField, values) {
    return !isNil(values[selfField]) && !isEmpty(values[selfField]);
  }
}

export class PriceAboveMinimumValidation {
  constructor(minimumPrice) {
    this._minimumPrice = minimumPrice;
    this.message = `The amount must be higher than the minimum price of ${minimumPrice}`;
  }
  
  applicable(selfField, blurredField, values) {
    return selfField === blurredField;
  }

  validate(selfField, values) {
    return values[selfField] >= this._minimumPrice;
  }
}

export class MatchesValidation {
  constructor(target, message) {
    this._target = target;
    this._message = message || target;
  }

  get message() {
    return `Must match ${this._message}`;
  }

  applicable(selfField, blurredField, values) {
    const current = (selfField === blurredField);
    const target = (this._target === blurredField);
    const empty = (values[selfField] && values[selfField].length === 0);

    return (current || (target && !empty));
  }

  validate(selfField, values) {
    return values[selfField] === values[this._target];
  }
}


export class RegexValidation {
  constructor(regex, message) {
    this._regex = regex;
    this.message = message;
  }

  applicable(selfField, blurredField, values) {
    return selfField === blurredField;
  }

  validate(selfField, values) {
    return this._regex.test(values[selfField]);
  }
}
