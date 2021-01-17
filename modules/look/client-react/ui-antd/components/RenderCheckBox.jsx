import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

import Space from './Space';
import Icon from './Icon';
import FormItem from './FormItem';

const RenderCheckBox = ({ icon = 'CheckCircleOutlined', input, label, meta: { touched, error }, inFilter = false }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  let labels = inFilter
    ? {}
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      };
  return (
    <FormItem
      label={
        <Space align="center">
          {icon && <Icon type={icon} />}
          {label}
        </Space>
      }
      validateStatus={validateStatus}
      help={error}
      {...labels}
    >
      <Checkbox {...input}>{label}</Checkbox>
    </FormItem>
  );
};

RenderCheckBox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  icon: PropTypes.string,
  inFilter: PropTypes.bool
};

export default RenderCheckBox;
