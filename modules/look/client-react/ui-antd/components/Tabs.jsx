import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as ADTabs } from 'antd';

const Tabs = ({ children, defalutActiveKey, tabPosition, tabBarExtraContent, size, type, ...props }) => {
  return (
    <ADTabs
      defalutActiveKey={defalutActiveKey}
      tabPosition={tabPosition}
      tabBarExtraContent={tabBarExtraContent}
      size={size}
      type={type}
      {...props}
    >
      {children}
    </ADTabs>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  defalutActiveKey: PropTypes.string,
  tabPosition: PropTypes.string,
  tabBarExtraContent: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string
};

export default Tabs;
