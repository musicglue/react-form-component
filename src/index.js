import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { keys, each, map } from 'lodash';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title',
  },
  categories: {
    type: 'input',
    label: 'Categories',
  },
  content: {
    type: 'textarea',
    label: 'Content',
  },
};

function validate(values) {
  const errors = {};

  each(FIELDS, (type, field) => {
    if (!values[field]) errors[field] = `Enter a ${field}`;
  });

  return errors;
}

class Form extends Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired,
  }

  onSubmit(props) {
    alert(`lol ${props}`);
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`FormGroup ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="FormControl" {...fieldHelper} />
        <div className="ErrorMessage">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
        <h3>Create a new Post</h3>
        {map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="Button Button-primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'Form',
  fields: keys(FIELDS),
  validate,
})(Form);
