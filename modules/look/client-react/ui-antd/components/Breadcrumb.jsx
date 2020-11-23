import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as ADBreadcrumb } from 'antd';

const ADBreadcrumbItem = ADBreadcrumb.Item;

const Breadcrumb = ({ children, ...props }) => {
  return (
    <ADBreadcrumb {...props}>
      {children.map(item => (
        <ADBreadcrumbItem key={item.props.children}>{item.props.children}</ADBreadcrumbItem>
      ))}
    </ADBreadcrumb>
  );
};
Breadcrumb.propTypes = {
  children: PropTypes.node
};

export default Breadcrumb;
