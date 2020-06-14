import React from 'react';
import PropTypes from 'prop-types';
import { Badge as ADBadge } from 'antd';

const Badge = ({ children, ...props }) => {
  return <ADBadge {...props}>{children}</ADBadge>;
};

Badge.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
  dot: PropTypes.bool,
  status: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string
};
export default Badge;
