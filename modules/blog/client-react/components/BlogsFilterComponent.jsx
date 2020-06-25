import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormItem, Select, Option, Input } from '@gqlapp/look-client-react';
import { status as BlogStatus } from '../constants';

const BlogsFilterComponent = ({
  filter: { searchText, model, status },
  onSearchTextChange,
  onModelChange,
  onStatusChange,
  models,
  currentUser
}) => {
  return (
    <Form layout="inline">
      <FormItem label={'Search'}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={'Search by name, tag, username, description, etc'}
          element={Input}
          value={searchText}
          onChange={e => onSearchTextChange(e.target.value)}
        />
      </FormItem>
      &nbsp;
      <FormItem label={'Model'}>
        <Select name="model" defaultValue={model} style={{ width: '100px' }} onChange={val => onModelChange(val)}>
          <Option key={0} value="">
            All
          </Option>
          {models.map((item, idx) => (
            <Option key={idx + 1} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
      </FormItem>
      &nbsp;
      {currentUser && currentUser.role === 'admin' && (
        <FormItem label={'Status'}>
          <Select name="status" defaultValue={status} style={{ width: '100px' }} onChange={val => onStatusChange(val)}>
            <Option key={1} value="">
              All
            </Option>
            {BlogStatus.map(item => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </FormItem>
      )}
    </Form>
  );
};

BlogsFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  currentUser: PropTypes.object
};

export default BlogsFilterComponent;
