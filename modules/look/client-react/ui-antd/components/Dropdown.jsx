import React from 'react';
import PropTypes from 'prop-types';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu, Dropdown } from 'antd';

class DropDown extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string
  };
  componentDidMOunt() {
    console.log(this.props);
  }

  render() {
    const { children, ...props } = this.props;
    // return <Menu.Item {...props}>{children}</Menu.Item>;

    const menu = <Menu>{children}</Menu>;

    const content = props.content ? props.content : null;
    return (
      <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
        <a className="ant-dropdown-link" href="#">
          {content}
          {!props.noicon ? <LegacyIcon className="dropdown" type={props.type ? props.type : 'down'} /> : null}
        </a>
      </Dropdown>
    );
  }
}

export default DropDown;
