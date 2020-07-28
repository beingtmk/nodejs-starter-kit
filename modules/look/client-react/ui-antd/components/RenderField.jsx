import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const RenderField = ({ rows, input, label, type, meta: { touched, error }, placeholder, style }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} hasFeedback={type != 'textarea'} validateStatus={validateStatus} help={touched && error} style={style}>
      {type != 'textarea' ? <Input {...input} placeholder={placeholder || label} type={type}  /> : null}

      {type == 'textarea' ? <TextArea {...input} placeholder={placeholder || label} rows={rows || 5} /> : null}
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;
