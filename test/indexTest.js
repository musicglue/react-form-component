import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Form from '../src/index.js';
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

const sampleInitialValues = {
  name: 'sampleName',
  email: 'sampleEmail@example.com',
  password: 'secret',
  country: 'gb',
  biography: 'Lorem ipsum',
};

const sampleValidations = {
  name: [new RequiredValidation()],
  email: [
    new RequiredValidation(),
    new RegexValidation(/.+@.+/, 'Invalid email address'),
  ],
  password: [new RequiredValidation()],
};

function createForm(
    initialValues = sampleInitialValues,
    validations = sampleValidations,
    submitHandler = () => {}
) {
  return (
    <Form
      className="mg-spacer-bottom"
      initialValues={initialValues}
      validations={validations}
      onSubmit={submitHandler}
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
  );
}

describe('[root]', () => {
  describe('<Form />', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(createForm());
    });

    describe('renders children', () => {
      it('have a TextField', () =>
        expect(wrapper.find(TextField).length).to.equal(1));

      it('have an EmailField', () =>
        expect(wrapper.find(EmailField).length).to.equal(1));

      it('have an PasswordField', () =>
        expect(wrapper.find(PasswordField).length).to.equal(1));

      it('have an SelectField', () =>
        expect(wrapper.find(SelectField).length).to.equal(1));

      it('have an TextareaField', () =>
        expect(wrapper.find(TextareaField).length).to.equal(1));
    });
  });
});
