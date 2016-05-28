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

export class MatchesValidation {
  constructor(target, message) {
    this.target = target;
    this.message = message || target;
  }

  get message() {
    return `Must match ${this.message}`;
  }

  applicable(selfField, blurredField, values) {
    const current = (selfField === blurredField);
    const target = (this.target === blurredField);
    const empty = (values[selfField] && values[selfField].length === 0);

    return (current || (target && !empty));
  }

  validate(selfField, values) {
    return values[selfField] === values[this.target];
  }
}


export class RegexValidation {
  constructor(regex, message) {
    this.regex = regex;
    this.message = message;
  }

  applicable(selfField, blurredField, values) {
    return selfField === blurredField;
  }

  validate(selfField, values) {
    return this.regex.test(values[selfField]);
  }
}
