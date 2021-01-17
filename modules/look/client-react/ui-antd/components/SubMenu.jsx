import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const ADSubMenu = Menu.SubMenu;

const SubMenu = ({ children, ...props }) => {
  return <ADSubMenu {...props}>{children}</ADSubMenu>;
};

SubMenu.propTypes = {
  children: PropTypes.node
};

export default SubMenu;
