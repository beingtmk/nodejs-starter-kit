import React from 'react';
import PropTypes from 'prop-types';
import { Radio as ADRadio } from 'antd';
import FormItem from './FormItem';

const Radio = ({ children, type, label, meta: { touched, error }, ...props }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      {type === 'group' && <ADRadio.Group {...props}>{children}</ADRadio.Group>}
      {type === 'button' && <ADRadio.Button {...props}>{children}</ADRadio.Button>}
      {type !== 'group' && type !== 'button' && <ADRadio {...props}>{children}</ADRadio>}
    </FormItem>
  );
};

Radio.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object
};
export default Radio;
