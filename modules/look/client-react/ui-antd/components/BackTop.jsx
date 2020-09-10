import React from 'react';
import PropTypes from 'prop-types';
import { BackTop as ADBackTop } from 'antd';

const BackTop = ({ children, ...props }) => {
  return <ADBackTop {...props}>{children}</ADBackTop>;
};

BackTop.propTypes = {
  children: PropTypes.node
};

export default BackTop;
