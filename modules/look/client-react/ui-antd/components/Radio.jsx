import React from 'react';
import PropTypes from 'prop-types';
import { Radio as ADRadio } from 'antd';

const Radio = ({ children, ...props }) => {
  return <ADRadio {...props}>{children}</ADRadio>;
};

Radio.propTypes = {
  children: PropTypes.node
};
export default Radio;
