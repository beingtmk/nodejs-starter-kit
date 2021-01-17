import React from 'react';
import PropTypes from 'prop-types';
import { Menu as ADMenu } from 'antd';

const Menu = ({ children, ...props }) => {
  return <ADMenu {...props}>{children}</ADMenu>;
};

Menu.propTypes = {
  children: PropTypes.node
};
export default Menu;
