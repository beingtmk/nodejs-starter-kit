import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const TabPane = ({ children, tab, tabkey, ...props }) => {
  return (
    <Tabs.TabPane tab={tab} key={tabkey} {...props}>
      {children}
    </Tabs.TabPane>
  );
};

TabPane.propTypes = {
  children: PropTypes.node,
  tab: PropTypes.string,
  tabkey: PropTypes.string
};
export default TabPane;
