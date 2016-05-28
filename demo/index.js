import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

import Form from '../src/';

export default class FormDemo extends Component {
  initialValues = {}
  validations = {}

  submitHandler(props) {
    console.log(props);
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <Form handleSubmit={this.submitHandler} />
      </div>
    );
  }
}

render((
  <Provider store={store}>
    <FormDemo />
  </Provider>
), document.getElementById('root'));
