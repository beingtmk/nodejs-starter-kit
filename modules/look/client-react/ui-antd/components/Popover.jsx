import React from 'react';
import PropTypes from 'prop-types';
import { Popover as ADPopover } from 'antd';

const Popover = ({ children, ...props }) => {
  return <ADPopover {...props}>{children}</ADPopover>;
};

Popover.propTypes = {
  children: PropTypes.node
};
export default Popover;
