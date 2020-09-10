import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const TabPane = ({ children, ...props }) => {
  return <Tabs.TabPane {...props}>{children}</Tabs.TabPane>;
};

TabPane.propTypes = {
  children: PropTypes.node
};
export default TabPane;
