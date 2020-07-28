import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Input } from '@gqlapp/look-client-react';

const ModelsFilterComponent = ({ filter: { searchText, gearCategory }, onSearchTextChange }) => (
  <Form layout="inline">
    <FormItem label="Search">
      <DebounceInput
        minLength={1}
        debounceTimeout={300}
        placeholder="Search Item"
        element={Input}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
    </FormItem>
    &nbsp;
  </Form>
);

ModelsFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired
};

export default ModelsFilterComponent;
