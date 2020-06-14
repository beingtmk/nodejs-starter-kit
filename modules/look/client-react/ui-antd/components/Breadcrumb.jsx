import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as ADBreadcrumb } from 'antd';

const Breadcrumb = ({ children, ...props }) => {
  return (
    <ADBreadcrumb {...props}>
      {children.map(item => (
        <ADBreadcrumb.Item key={item.props.children}>{item.props.children}</ADBreadcrumb.Item>
      ))}
    </ADBreadcrumb>
  );
};
Breadcrumb.propTypes = {
  children: PropTypes.node
};

export default Breadcrumb;
