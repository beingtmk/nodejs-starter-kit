import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as ADDatePicker } from 'antd';

import FormItem from './FormItem';
import Space from './Space';
import Icon from './Icon';

const RenderDatePicker = ({ icon = 'CalendarOutlined', type, label, meta: { touched, error }, input, ...props }) => {
  let validateStatus = '';
  if (error) {
    validateStatus = 'error';
  }

  return (
    <>
      <FormItem
        label={
          <Space align="center">
            {icon && <Icon type={icon} />}
            {label}
          </Space>
        }
        validateStatus={validateStatus}
        help={touched && error}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        {type === 'range' && <ADDatePicker.RangePicker {...input} {...props} />}
        {type !== 'range' && <ADDatePicker {...input} {...props} />}
      </FormItem>
    </>
  );
};
RenderDatePicker.propTypes = {
  input: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  meta: PropTypes.object
};
export default RenderDatePicker;
