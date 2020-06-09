import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Input } from '@gqlapp/look-client-react';

const GroupsFilterComponent = ({ filter: { searchText }, onSearchTextChange }) => {
  return (
    <Form layout="inline">
      <FormItem label={'Search'}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={'Search by title, description, type, email, username, etc'}
          element={Input}
          value={searchText}
          onChange={e => onSearchTextChange(e.target.value)}
        />
      </FormItem>
    </Form>
  );
};

GroupsFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired
};

export default GroupsFilterComponent;
