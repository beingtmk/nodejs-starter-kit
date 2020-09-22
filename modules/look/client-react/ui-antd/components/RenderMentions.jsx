import React from 'react';
import PropTypes from 'prop-types';

import { Mentions as ADMentions } from 'antd';
import FormItem from './FormItem';

const RenderMentions = ({ children, label, meta: { touched, error }, ...props }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      <ADMentions {...props}>{children}</ADMentions>
    </FormItem>
  );
};

RenderMentions.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  meta: PropTypes.object
};

export default RenderMentions;
