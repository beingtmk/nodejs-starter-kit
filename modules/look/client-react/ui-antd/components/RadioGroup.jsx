import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const RadioGroup = ({ children, ...props }) => {
  return <Radio.Group {...props}>{children}</Radio.Group>;
};
RadioGroup.propTypes = {
  children: PropTypes.node
};
export default RadioGroup;
