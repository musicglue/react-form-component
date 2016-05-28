import React from 'react';

import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Form from '../../src';
import * as Fields from '../../src/fields';

import { RequiredValidation } from '../../src/validations';

describe('RequiredValidation', () => {
  let wrapper;

  const required = { 'test.text': [new RequiredValidation()] };
  const onSubmit = sinon.spy();

  const mockForm = (
    <Form
      validations={required}
      initialValues={{}}
      onSubmit={onSubmit}
    >
      <Fields.TextField
        name="test.text"
        label="test input"
      />
    </Form>
  );

  beforeEach('render the form', () => (wrapper = mount(mockForm)));

  context('when the value is not filled in', () => {
    beforeEach('simulate empty value', () => {
      wrapper.find('form').simulate('submit');
    });

    beforeEach('until RFC makes things right', cb => setTimeout(cb, 0));

    it('does not fire the onSubmit callback', () => {
      expect(onSubmit.called).to.eq(false);
    });

    it('outputs an error message', () => {
      expect(wrapper.html()).to.include('You must enter a value');
    });
  });

  context('when the value is filled in', () => {
    beforeEach('fill in the value', () => {
      wrapper.find('input').simulate('change', { target: { value: 'test input' } });
    });


    beforeEach('submit the for,', () => {
      wrapper.find('form').simulate('submit');
    });

    beforeEach('until RFC makes things right', cb => setTimeout(cb, 0));

    it('calls the onSubmit callback', () => {
      expect(onSubmit.called).to.eq(true);
    });
  });
});
