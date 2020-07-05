import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions as ADDescriptions } from 'antd';

const Descriptions = ({ children, ...props }) => {
  return <ADDescriptions {...props}>{children}</ADDescriptions>;
};
Descriptions.propTypes = {
  children: PropTypes.node
};
export default Descriptions;
