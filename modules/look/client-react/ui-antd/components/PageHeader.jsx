import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader as ADPageHeader } from 'antd';

const PageHeader = ({ children, ...props }) => {
  return <ADPageHeader {...props}>{children}</ADPageHeader>;
};

PageHeader.propTypes = {
  children: PropTypes.node
};

export default PageHeader;
