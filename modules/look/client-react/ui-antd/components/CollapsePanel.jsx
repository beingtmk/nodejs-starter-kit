import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';

const ADCollapsePanel = Collapse.Panel;

const CollapsePanel = ({ children, ...props }) => {
  return <ADCollapsePanel {...props}>{children}</ADCollapsePanel>;
};

CollapsePanel.propTypes = {
  children: PropTypes.node
};
export default CollapsePanel;
