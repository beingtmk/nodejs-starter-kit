import React from 'react';
import PropTypes from 'prop-types';
import { Form, AutoComplete } from 'antd';

const FormItem = Form.Item;

const RenderAutoComplete = ({
  input,
  label,
  onSearch,
  onSelect,
  dataSource,
  meta: { touched, error },
  placeholder
}) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  // console.log("RenderField input", input);
  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      <AutoComplete
        {...input}
        dataSource={dataSource}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder={placeholder || label}
      />
    </FormItem>
  );
};

RenderAutoComplete.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  dataSource: PropTypes.array,
  meta: PropTypes.object
};

export default RenderAutoComplete;
