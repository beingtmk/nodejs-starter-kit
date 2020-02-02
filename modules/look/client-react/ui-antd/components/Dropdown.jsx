import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown } from 'antd';

class DropDown extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string
  };
  componentWillMOunt() {
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
          {!props.noicon ? <Icon className="dropdown" type={props.type ? props.type : 'down'} /> : null}
        </a>
      </Dropdown>
    );
  }
}

export default DropDown;
