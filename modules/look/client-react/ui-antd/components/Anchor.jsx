import React from 'react';
import PropTypes from 'prop-types';
import { Anchor as ADAnchor } from 'antd';

const Anchor = ({ children, ...props }) => {
  return <ADAnchor {...props}>{children}</ADAnchor>;
};
Anchor.propTypes = {
  children: PropTypes.node
};
export default Anchor;
