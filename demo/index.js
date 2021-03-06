/* eslint no-alert: [0] */

import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from '../src/';

import {
  EmailField,
  PasswordField,
  SelectField,
  TextField,
  TextareaField,
} from '../src/fields';

import {
  RequiredValidation,
  RegexValidation,
} from '../src/validations';

export default class FormDemo extends Component {
  initialValues = {
    name: 'initial name here',
    email: '',
    password: '',
    country: 'gb',
    biography: '',
  }

  validations = {
    name: [new RequiredValidation()],
    email: [
      new RequiredValidation(),
      new RegexValidation(/.+@.+/, 'Invalid email address'),
    ],
    password: [new RequiredValidation()],
  }

  submitHandler({ name, email }) {
    window.alert(
      `Thanks for signing up, ${name}.\n
      An email has been sent to ${email}`);
  }

  render() {
    return (
      <div>
        <h1>Form</h1>

        <p>This should be a description of form component's features.</p>

        <Form
          className="mg-spacer-bottom"
          initialValues={this.initialValues}
          validations={this.validations}
          onSubmit={this.submitHandler}
        >
          <TextField name="name" label="Name" />
          <EmailField name="email" label="Email address" />
          <PasswordField name="password" label="Password" />
          <SelectField
            name="country"
            label="Country"
            options={[
              { value: 'au', text: 'Australia' },
              { value: 'fr', text: 'France' },
              { value: 'gb', text: 'United Kingdom' },
              { value: 'us', text: 'United States' },
            ]}
          />
          <TextareaField name="biography" label="Biography" />
        </Form>
      </div>
    );
  }
}

render(<FormDemo />, document.getElementById('root'));
