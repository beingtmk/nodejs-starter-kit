import React from 'react';
import PropTypes from 'prop-types';
import { Empty as ADEmpty } from 'antd';

const Empty = ({ children, ...props }) => {
  return <ADEmpty {...props}>{children}</ADEmpty>;
};

Empty.propTypes = {
  children: PropTypes.node
};
export default Empty;
