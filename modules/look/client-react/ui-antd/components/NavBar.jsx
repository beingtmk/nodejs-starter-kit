import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Icon, Row, Col, Layout } from 'antd';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

import MenuItem from './MenuItem';
import LoggedIn from '../auth/LoggedIn';
import DropDown from './Dropdown';

const { SubMenu } = Menu;

const ref = { modules: null };

const { Header } = Layout;

export const onAppCreate = async modules => (ref.modules = modules);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/'
    };
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const isMobile = this.props && this.props.isMobile;
    return (
      <ScrollParallax
        location="page-layout"
        className="navbar-parallex"
        animation={{
          playScale: [1, 1.1],
          translateY: this.state.isMobile ? '' : '-40px'
        }}
      >
        <Header className="no-print">
          <Row className="navbar-wrapper">
            <Col lg={24} xs={0}>
              <div align="right" className="navbar-contact-menu">
                <Row style={{ lineHeight: '37px' }}>
                  <Col span={10} />
                  <Col span={6}>
                    <Icon type="phone" /> +918888888888
                  </Col>
                  <Col span={8}>
                    <Icon type="mail" /> nodejs-starterkit@approxyma.com
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <Row>
                <Col align="left" xs={12} md={12} lg={6}>
                  <NavLink to="/" className="nav-link">
                    <ScrollParallax
                      location="page-layout"
                      className="navbar-logo-lg"
                      animation={{
                        playScale: [1, 1.1],
                        scale: isMobile ? 1 : 0.5,
                        translateX: isMobile ? '' : '-79px',
                        translateY: isMobile ? '' : '20px'
                      }}
                    >
                      <img
                        height="100%"
                        src={
                          'https://res.cloudinary.com/www-lenshood-in/image/upload/v1580224348/nodejs-starterkit/untitled_5.svg'
                        }
                        className="navbar-logo-img"
                        alt="Mountain"
                      />
                    </ScrollParallax>
                  </NavLink>
                </Col>
                <Col xs={0} md={0} lg={4}>
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
                    <MenuItem>
                      <DropDown type="apartment">{ref.modules.navItemsBrowse}</DropDown>
                    </MenuItem>
                    <LoggedIn role="admin">
                      <MenuItem>
                        <DropDown type="safety-certificate">{ref.modules.navItemsAdmin}</DropDown>
                      </MenuItem>
                    </LoggedIn>
                  </Menu>
                </Col>

                <Col xs={0} md={0} lg={14} align="right">
                  <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.location.pathname]}
                    mode="horizontal"
                    theme="light"
                    style={{ lineHeight: '39px' }}
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
                <Col xs={12} md={12} lg={0}>
                  <div onClick={this.showDrawer} className="navbar-drawer-logo">
                    <Icon
                      type="menu"
                      style={{
                        color: 'inherit',
                        fontSize: '20px',
                        position: 'absolute',
                        top: '10px',
                        right: '0px'
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>

            <Drawer placement="right" onClose={this.onClose} visible={this.state.visible}>
              <Menu
                mode="inline"
                selectedKeys={[this.props.location.pathname]}
                theme="light"
                style={{ lineHeight: '50px' }}
              >
                {ref.modules.navItemsRight}
                <LoggedIn>
                  <div style={{ height: '100px' }} align="center">
                    <UserAvatar shape="square" size={100} />
                  </div>
                </LoggedIn>
                {ref.modules.navItemsUser}
                {/* {this.NavLinkMyInvitesWithI18n()} */}
                {__DEV__ && (
                  <SubMenu
                    key="test"
                    style={{ color: 'black !important' }}
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
                <MenuItem>
                  <DropDown type="apartment">{ref.modules.navItemsBrowse}</DropDown>
                </MenuItem>
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
        </Header>{' '}
      </ScrollParallax>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};

export default withRouter(NavBar);
