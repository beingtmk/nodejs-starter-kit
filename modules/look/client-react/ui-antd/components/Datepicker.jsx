import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as ADDatePicker } from 'antd';

const DatePicker = ({ type, ...props }) => {
  return (
    <>
      {type === 'range' && <ADDatePicker.RangePicker {...props} />}
      {type !== 'range' && <ADDatePicker {...props} />}
    </>
  );
};
DatePicker.propTypes = {
  type: PropTypes.string
};
export default DatePicker;
