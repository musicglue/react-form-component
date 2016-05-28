import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import Form from '../src/';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class FormDemo extends Component {
  initialValues = {}
  validations = {}
  fields = {
    text: {
      element: 'input',
      type: 'text',
      label: 'Text input',
    },
    password: {
      element: 'input',
      type: 'password',
      label: 'Password input',
    },
    email: {
      element: 'input',
      type: 'text',
      label: 'Required Email input',
    },
    tel: {
      element: 'input',
      type: 'tel',
      label: 'Tel input',
    },
    number: {
      element: 'input',
      type: 'number',
      label: 'Number input',
    },
    date: {
      element: 'input',
      type: 'date',
      label: 'Date input',
    },
    color: {
      element: 'input',
      type: 'color',
      label: 'Color input',
    },
    textarea: {
      element: 'textarea',
      label: 'Textarea',
    },
  }

  submitHandler(props) {
    console.log('sent', props);
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <Form
          fields={Object.keys(this.fields)}
          fieldConfig={this.fields}
          handleSubmit={this.submitHandler}
        />
      </div>
    );
  }
}

render((
  <Provider store={store}>
    <FormDemo />
  </Provider>
), document.getElementById('root'));
