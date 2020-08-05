import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect as ADTreeSelect } from 'antd';

const TreeSelect = ({ children, ...props }) => {
  return <ADTreeSelect {...props}>{children}</ADTreeSelect>;
};

TreeSelect.propTypes = {
  children: PropTypes.node
};

export default TreeSelect;
