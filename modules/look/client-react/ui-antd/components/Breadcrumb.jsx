import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as ADBreadcrumb } from 'antd';

const ADBreadcrumbItem = ADBreadcrumb.Item;

const Breadcrumb = ({ children, ...props }) => {
  return (
    <ADBreadcrumb {...props}>
      {children.map((item, i) => {
        return (
          item &&
          item.props &&
          item.props.children && (
            <ADBreadcrumbItem key={i} {...item.props}>
              {item.props.children}
            </ADBreadcrumbItem>
          )
        );
      })}
    </ADBreadcrumb>
  );
};
Breadcrumb.propTypes = {
  children: PropTypes.node
};

export default Breadcrumb;
