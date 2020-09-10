import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

const DescriptionsItem = ({ children, ...props }) => {
  return <Descriptions.Item {...props}>{children}</Descriptions.Item>;
};

DescriptionsItem.propTypes = {
  children: PropTypes.node
};

export default DescriptionsItem;
