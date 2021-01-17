import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const ADTitle = Typography.Title;

const Title = ({ children, ...props }) => {
  return <ADTitle {...props}>{children}</ADTitle>;
};

Title.propTypes = {
  children: PropTypes.node
};

export default Title;
