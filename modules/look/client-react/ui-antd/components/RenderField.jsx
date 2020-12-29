import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import Space from './Space';
import Icon from './Icon';
import FormItem from './FormItem';

const { TextArea } = Input;

const RenderField = ({ icon, input, label, type, meta: { touched, error }, placeholder, rows = 6, tooltip }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem
      label={
        <Space align="center">
          {icon && <Icon type={icon} />}
          {label}
        </Space>
      }
      hasFeedback={type != 'textarea'}
      validateStatus={validateStatus}
      help={touched && error}
      tooltip={tooltip}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
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
  meta: PropTypes.object,
  tooltip: PropTypes.object,
  icon: PropTypes.node
};

export default RenderField;
