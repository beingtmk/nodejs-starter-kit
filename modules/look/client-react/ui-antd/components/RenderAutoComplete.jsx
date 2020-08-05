import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete as ADAutoComplete } from 'antd';
import FormItem from './FormItem';

const RenderAutoComplete = ({ children, label, meta: { touched, error }, ...props }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      <ADAutoComplete {...props}>{children}</ADAutoComplete>
    </FormItem>
  );
};

RenderAutoComplete.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  meta: PropTypes.object
};
export default RenderAutoComplete;
