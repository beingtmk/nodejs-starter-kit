import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const FormItem = Form.Item;

const RenderSelect = ({ input, label, children, meta: { touched, error } }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  return (
    <FormItem label={label} hasFeedback validateStatus={validateStatus} help={touched && error}>
      <Select
        showSearch
        optionFilterProp="children"
        placeholder={label}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        {...input}
      >
        {children}
      </Select>
    </FormItem>
  );
};

RenderSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderSelect;
