import React from 'react';
import PropTypes from 'prop-types';
import { Badge as ADBadge } from 'antd';

const Badge = ({ children, ...props }) => {
  return <ADBadge {...props}>{children}</ADBadge>;
};

Badge.propTypes = {
  children: PropTypes.node
};
export default Badge;
