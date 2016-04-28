import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { reduxForm, reducer as formReducer } from 'redux-form';

class FormDemo extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
  };

  static fields = [ 'name', 'email' ];

  static validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/.+@.+/.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    return errors;
  }

  submitHandler = event => {
    event.preventDefault();
    console.log(arguments);
    console.log(this);
  }

  render() {
    const { fields: { name, email }, submitting, pristine, invalid } = this.props;

    return (
      <form onSubmit={this.submitHandler}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" {...name}/>
          {name.touched && name.error && <div className="validation-error">{name.error}</div>}
        </div>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Email" {...email}/>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting || pristine || invalid}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
}

const Form = reduxForm({
  form: 'formDemo',
  fields: FormDemo.fields,
  validate: FormDemo.validate
})(FormDemo);

// app

const reducers = { form: formReducer }
const reducer = combineReducers(reducers);
const store = createStore(reducer);
render(<Form store={store} />, document.getElementById('root'));
