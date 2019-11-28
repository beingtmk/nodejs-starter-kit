import React from "react";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { Menu, Row, Col, Dropdown, Icon } from "antd";

import settings from "@gqlapp/config";

import MenuItem from "./MenuItem";

const ref = { modules: null };

export const onAppCreate = async modules => (ref.modules = modules);

class NavBar extends React.Component {
  state = {
    current: "/"
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Row gutter={0}>
        <Col span={14}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: "64px" }}
          >
            <MenuItem key="/">
              <NavLink to="/" className="nav-link">
                {settings.app.name}
              </NavLink>
            </MenuItem>
            {ref.modules.navItems}
            {__DEV__ && (
              <MenuItem>
                <a href="/graphiql">GraphiQL</a>
              </MenuItem>
            )}
          </Menu>
        </Col>
        <Col span={10} align="right">
          <Dropdown
            overlay={
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.props.location.pathname]}
                mode="horizontal"
                theme="dark"
                style={{ lineHeight: "64px" }}
              >
                {ref.modules.navItemsRight}
              </Menu>
            }
            trigger={["click"]}
          >
            <a className="ant-dropdown-link" href="#">
              Click me <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
