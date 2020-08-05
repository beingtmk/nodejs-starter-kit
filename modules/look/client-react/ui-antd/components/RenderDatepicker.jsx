import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as ADDatePicker } from 'antd';
import FormItem from './FormItem';

const RenderDatePicker = ({ type, label, meta: { touched, error }, ...props }) => {
  let validateStatus = '';
  if (error) {
    validateStatus = 'error';
  }
  return (
    <>
      <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
        {type === 'range' && <ADDatePicker.RangePicker {...props} />}
        {type !== 'range' && <ADDatePicker {...props} />}
      </FormItem>
    </>
  );
};
RenderDatePicker.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object
};
export default RenderDatePicker;
