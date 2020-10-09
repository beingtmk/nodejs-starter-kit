import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Dropdown } from "antd";

class DropDown extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
  };
  componentDidMOunt() {}

  render() {
    const { children, content, noicon, type, placement, ...props } = this.props;
    // return <Menu.Item {...props}>{children}</Menu.Item>;

    const menu = <Menu>{children}</Menu>;

    return (
      <Dropdown
        overlay={menu}
        trigger={["click", "hover"]}
        placement={placement || "bottomRight"}
        {...props}
      >
        <a className="ant-dropdown-link" href="#">
          {content}
          {!noicon ? (
            <Icon className="dropdown" type={type ? type : "down"} />
          ) : null}
        </a>
      </Dropdown>
    );
  }
}

export default DropDown;
