import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';

import Icon from './Icon';

const DropDown = props => {
  const { children, onClick, content, type, noicon, className = '', placement = 'bottomCenter', ...rest } = props;
  const menu = <Menu onClick={onClick}>{children}</Menu>;

  return (
    <Dropdown overlayClassName={className} overlay={menu} trigger={['click', 'hover']} placement={placement} {...rest}>
      <a className="ant-dropdown-link" href="#">
        {content ? content : null}
        {!noicon ? <Icon className="dropdown" type={type ? type : 'DownOutlined'} /> : null}
      </a>
    </Dropdown>
  );
};

DropDown.propTypes = {
  type: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
  noicon: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  placement: PropTypes.string
};

export default DropDown;
