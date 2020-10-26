import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const RenderField = ({ input, label, type, meta: { touched, error }, placeholder, rows = 6 }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} hasFeedback={type != 'textarea'} validateStatus={validateStatus} help={touched && error}>
      {type != 'textarea' ? <Input {...input} placeholder={placeholder || label} type={type} /> : null}

      {type == 'textarea' ? <TextArea rows={rows} {...input} placeholder={placeholder || label} /> : null}
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;
