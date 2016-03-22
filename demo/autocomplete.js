import React, { Component } from 'react';
import { compose, filter, prop, test, toLower } from 'ramda';
import Form from '../';

import { AutocompleteField } from '../fields';

import {
  RequiredValidation,
  RegexValidation,
} from '../validations';

export default class AutocompleteDemo extends Component {
  state = {
    query: null,
  }

  options() {
    const regex = new RegExp('^'+this.state.query);
    const values = [
      {name: 'Apple', value: 'apple'},
      {name: 'Pizza', value: 'pizza'},
      {name: 'Potato', value: 'potato'},
      {name: 'Chocolate', value: 'chocolate'},
    ];

    return filter(compose(test(regex), toLower, prop('name')), values);
  }

  searchHandler = query => {
    // timeout to emulate latency
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.setState({ query }), 400);
  }

  render() {
    return (
      <div>
        <h2>Autocomplete</h2>

        <Form
          className="mg-spacer-bottom"
          initialValues={{}}
          validations={{}}
          onSubmit={() => {}}>

          <AutocompleteField
            name="food"
            label="Food"
            onSearch={this.searchHandler}
            options={this.options()} />
        </Form>
      </div>
    );
  }
}
