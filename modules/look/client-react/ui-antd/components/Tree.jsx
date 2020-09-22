import React from 'react';
import PropTypes from 'prop-types';
import { Tree as ADTree } from 'antd';

const Tree = ({ children, ...props }) => {
  return <ADTree {...props}>{children}</ADTree>;
};

Tree.propTypes = {
  children: PropTypes.node
};
export default Tree;
