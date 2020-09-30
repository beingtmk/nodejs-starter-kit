import React from "react";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { Drawer, Menu, Icon, Row, Col, Layout } from "antd";
import UserAvatar from "@gqlapp/user-client-react/containers/UserAvatar";
import ScrollParallax from "rc-scroll-anim/lib/ScrollParallax";

import MenuItem from "./MenuItem";
import LoggedIn from "../auth/LoggedIn";
import DropDown from "./Dropdown";

const { SubMenu } = Menu;

const ref = { modules: null };

const { Header } = Layout;

export const onAppCreate = async (modules) => (ref.modules = modules);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "/",
      visible: false,
      visibleLeftSider: false,
    };
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showDrawerLeft = () => {
    this.setState({
      visibleLeftSider: true,
    });
  };

  onCloseLeft = () => {
    this.setState({
      visibleLeftSider: false,
    });
  };

  render() {
    const { layoutType } = this.props;
    const isMobile = this.props && this.props.isMobile;
    const { leftSiderComponent } = this.props;
    return (
      <ScrollParallax
        location="page-layout"
        className="navbar-parallex"
        animation={{
          playScale: [1, 1.1],
          translateY: this.state.isMobile ? "" : "-40px",
        }}
      >
        <div className={`navbar-top-layer-wrapper navbar-top-layer-wrapper-${layoutType}`}>
          <Row className="navbar-top-layer">
            <Col md={12} xs={0}></Col>
            <Col md={12} xs={24} align="right">
              <span style={{ paddingRight: "20px" }}>
                <Icon type="phone" /> {"+91 999 999 9999"}
              </span>
              <Icon type="mail" /> {"aaaaa@aaa.com"}
            </Col>
          </Row>
        </div>
        <Header className="no-print navbar-header">
          <Row className={`navbar-wrapper-${layoutType}`}>
            <Col span={24}>
              <Row>
                <Col align="left" xs={18} md={12} lg={7}>
                  {leftSiderComponent && (
                    <Col md={0} xs={4}>
                      <div
                        className="navbar-drawer-logo"
                        onClick={this.showDrawerLeft}
                      >
                        <Icon
                          type="menu-unfold"
                          style={{
                            color: "inherit",
                            position: "absolute",
                            top: "13px",
                            // right: "0px",
                          }}
                        />
                      </div>
                    </Col>
                  )}
                  <Col md={24} xs={4}>
                    <NavLink to="/" className="nav-link">
                      <div className="navbar-logo-wrapper">
                        <img
                          src={
                            "https://res.cloudinary.com/approxyma/image/upload/v1597225742/Brainayan-Unleash-Unrealized-Potential_gligmg.png"
                          }
                          className="navbar-logo-img"
                          alt="Mountain"
                        />
                      </div>
                    </NavLink>
                  </Col>
                </Col>
                <Col xs={0} md={0} lg={2}>
                  <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.location.pathname]}
                    mode="horizontal"
                    theme="light"
                    className="navbar-menu"
                  >
                    {__DEV__ && (
                      <MenuItem>
                        <DropDown type="deployment-unit">
                          {ref.modules.navItemsTest}
                          <MenuItem>
                            <a href="/graphiql">GraphiQL</a>
                          </MenuItem>
                        </DropDown>
                      </MenuItem>
                    )}

                    <LoggedIn role="admin">
                      <MenuItem>
                        <DropDown type="safety-certificate">
                          {ref.modules.navItemsAdmin}
                        </DropDown>
                      </MenuItem>
                    </LoggedIn>
                  </Menu>
                </Col>

                <Col xs={0} md={0} lg={15} align="right">
                  <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.location.pathname]}
                    mode="horizontal"
                    theme="light"
                    className="navbar-menu"
                  >
                    {ref.modules.navItems}
                    {ref.modules.navItemsRight}
                    <LoggedIn>
                      <MenuItem>
                        <DropDown content={<UserAvatar />} noicon>
                          {ref.modules.navItemsUser}
                        </DropDown>
                      </MenuItem>
                    </LoggedIn>
                  </Menu>
                </Col>
                <Col xs={6} md={12} lg={0}>
                  <div onClick={this.showDrawer} className="navbar-drawer-logo">
                    <Icon
                      type="menu"
                      style={{
                        color: "inherit",
                        position: "absolute",
                        top: "13px",
                        right: "0px",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>

            <Drawer
              placement="left"
              className="navbar-left-sider"
              onClose={this.onCloseLeft}
              visible={this.state.visibleLeftSider}
            >
              {leftSiderComponent}
            </Drawer>
            <Drawer
              placement="right"
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Menu
                mode="inline"
                selectedKeys={[this.props.location.pathname]}
                theme="light"
                style={{ lineHeight: "50px" }}
              >
                {ref.modules.navItemsRight}
                <LoggedIn>
                  <div style={{ height: "100px" }} align="center">
                    <UserAvatar shape="square" size={100} />
                  </div>
                </LoggedIn>
                {ref.modules.navItemsUser}
                {/* {this.NavLinkMyInvitesWithI18n()} */}
                {__DEV__ && (
                  <SubMenu
                    key="test"
                    style={{ color: "black !important" }}
                    title={
                      <MenuItem>
                        <Icon type="deployment-unit" /> Dev
                      </MenuItem>
                    }
                  >
                    {ref.modules.navItemsTest}
                    <MenuItem>
                      <a href="/graphiql">GraphiQL</a>
                    </MenuItem>
                  </SubMenu>
                )}
                <LoggedIn role="admin">
                  <SubMenu
                    key="admin"
                    title={
                      <MenuItem>
                        <Icon type="safety-certificate" /> Admin
                      </MenuItem>
                    }
                  >
                    {ref.modules.navItemsAdmin}
                  </SubMenu>
                </LoggedIn>
                {ref.modules.navItems}
              </Menu>
            </Drawer>
          </Row>
        </Header>
      </ScrollParallax>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
};

export default withRouter(NavBar);
