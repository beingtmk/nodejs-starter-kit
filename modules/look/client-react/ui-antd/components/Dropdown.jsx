import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';

import Icon from './Icon';

class DropDown extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string
  };
  componentDidMOunt() {
    console.log(this.props);
  }

  render() {
    const { children, onClick, className, ...props } = this.props;
    // return <Menu.Item {...props}>{children}</Menu.Item>;

    const menu = <Menu onClick={onClick}>{children}</Menu>;

    const content = props.content ? props.content : null;
    return (
      <Dropdown
        overlayClassName={className}
        overlay={menu}
        trigger={['click', 'hover']}
        placement="bottomCenter"
        {...props}
      >
        <a className="ant-dropdown-link" href="#">
          {content}
          {!props.noicon ? <Icon className="dropdown" type={props.type ? props.type : 'DownOutlined'} /> : null}
        </a>
      </Dropdown>
    );
  }
}

DropDown.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default DropDown;
