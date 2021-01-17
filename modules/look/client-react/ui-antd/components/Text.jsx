import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const ADText = Typography.Text;
const Text = ({ children, ...props }) => {
  return <ADText {...props}>{children}</ADText>;
};

Text.propTypes = {
  children: PropTypes.node
};

export default Text;
