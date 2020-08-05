import React from 'react';
import PropTypes from 'prop-types';

const BreadcrumbItem = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

BreadcrumbItem.propTypes = {
  children: PropTypes.node
};

export default BreadcrumbItem;
