import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as ADDatePicker } from 'antd';
import FormItem from './FormItem';

const RenderDatePicker = ({ type, label, meta: { touched, error }, input, ...props }) => {
  let validateStatus = '';
  if (error) {
    validateStatus = 'error';
  }

  return (
    <>
      <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
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
  meta: PropTypes.object
};
export default RenderDatePicker;
