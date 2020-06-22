import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';

const Panel = ({ children, ...props }) => {
  return <Collapse.Panel {...props}>{children}</Collapse.Panel>;
};

Panel.propTypes = {
  children: PropTypes.node
};
export default Panel;
