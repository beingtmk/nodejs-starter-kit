import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Layout } from 'antd';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

import { Row, Col } from '@gqlapp/look-client-react';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';
import HOME_ROUTES from '@gqlapp/home-client-react/routes';

import Icon from './Icon';
import MenuItem from './MenuItem';
import LoggedIn from '../auth/LoggedIn';
import DropDown from './Dropdown';

const { SubMenu } = Menu;

const ref = { modules: null };

const { Header } = Layout;

const BannerLink = styled.a`
  color: black;
`;

export const onAppCreate = async modules => (ref.modules = modules);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: `${HOME_ROUTES.home}`
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
    const platform = this.props.platform;
    const isMobile = this.props && this.props.isMobile;
    return (
      <ScrollParallax
        location="page-layout"
        className="navbar-parallex"
        animation={{
          playScale: [1, 1.1],
          translateY: isMobile ? '' : '-40px'
        }}
      >
        <Header className="no-print">
          <Row className="navbar-wrapper">
            <Col lg={24} xs={0}>
              <div align="right" className="navbar-contact-menu">
                {platform && (
                  <Row style={{ lineHeight: '37px' }} justify="end" gutter={24}>
                    <Col>
                      <BannerLink href={`tel: ${platform.platformInfo.mobile}`}>
                        <Icon type="PhoneOutlined" /> &nbsp;
                        {platform.platformInfo.mobile}
                      </BannerLink>
                    </Col>
                    <Col>
                      <BannerLink
                        href={`mailto: ${platform.platformInfo.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon type="MailOutlined" /> &nbsp;
                        {platform.platformInfo.email}
                      </BannerLink>
                    </Col>
                    <Col>
                      <a href={platform.platformSocial.twitter} target="_blank" rel="noopener noreferrer">
                        <Icon type="TwitterSquareFilled" style={{ color: 'black', fontSize: '20px' }} />
                      </a>
                      &nbsp;
                      <a href={platform.platformSocial.instagram} target="_blank" rel="noopener noreferrer">
                        <Icon type="InstagramFilled" style={{ color: 'black', fontSize: '20px' }} />
                      </a>
                      &nbsp;
                      <a href={platform.platformSocial.facebook} target="_blank" rel="noopener noreferrer">
                        <Icon type="FacebookFilled" style={{ color: 'black', fontSize: '20px' }} />
                      </a>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>

            <Col span={24}>
              <Row>
                <Col align="left" xs={12} md={12} lg={6} style={{ height: '50px' }}>
                  <NavLink to={`${HOME_ROUTES.home}`} className="nav-link">
                    <ScrollParallax
                      location="page-layout"
                      className="navbar-logo-lg"
                      animation={{
                        playScale: [1, 1.1],
                        scale: isMobile ? 1 : 0.5,
                        translateX: isMobile ? '' : '-45px',
                        translateY: isMobile ? '' : '20px'
                      }}
                    >
                      {platform && (
                        <img
                          // height="80px"
                          src={platform.logo}
                          className="navbar-logo-img"
                          alt="Mountain"
                        />
                      )}
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
                        <DropDown type="DeploymentUnitOutlined">
                          {ref.modules.navItemsTest}
                          <MenuItem>
                            <a href="/graphiql">GraphiQL</a>
                          </MenuItem>
                        </DropDown>
                      </MenuItem>
                    )}
                    <MenuItem>
                      <DropDown type="ApartmentOutlined">{ref.modules.navItemsBrowse}</DropDown>
                    </MenuItem>
                    <LoggedIn role="admin">
                      <MenuItem>
                        <DropDown type="SafetyCertificateOutlined">{ref.modules.navItemsAdmin}</DropDown>
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
                    className="navbar-menu"
                  >
                    <Row type="flex" justify="end">
                      {ref.modules.navItems}
                      {ref.modules.navItemsRight}

                      <LoggedIn>
                        <MenuItem>
                          <DropDown content={<UserAvatar />} noicon>
                            {ref.modules.navItemsUser}
                          </DropDown>
                        </MenuItem>
                      </LoggedIn>
                    </Row>
                  </Menu>
                </Col>
                <Col xs={12} md={12} lg={0}>
                  <div onClick={this.showDrawer} className="navbar-drawer-logo">
                    <Icon
                      type="MenuOutlined"
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
                style={{ lineHeight: '50px', border: '0px' }}
              >
                {ref.modules.navItemsRight}
                <LoggedIn>
                  <div style={{ height: '100px' }} align="center">
                    <UserAvatar shape="square" size={100} />
                  </div>
                </LoggedIn>
                {ref.modules.navItemsUser}
                {__DEV__ && (
                  <SubMenu
                    key="test"
                    style={{ color: 'black !important' }}
                    title={
                      <MenuItem>
                        <Icon type="DeploymentUnitOutlined" />
                        Dev
                      </MenuItem>
                    }
                  >
                    {ref.modules.navItemsTest}
                    <MenuItem>
                      <a href="/graphiql">GraphiQL</a>
                    </MenuItem>
                  </SubMenu>
                )}
                <SubMenu
                  key="admin"
                  title={
                    <MenuItem>
                      <Icon type="ApartmentOutlined" /> Browse
                    </MenuItem>
                  }
                >
                  {ref.modules.navItemsBrowse}
                </SubMenu>
                <LoggedIn role="admin">
                  <SubMenu
                    key="admin"
                    title={
                      <MenuItem>
                        <Icon type="SafetyCertificateOutlined" />
                        Admin
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
  isMobile: PropTypes.bool,
  platform: PropTypes.object
};

export default withRouter(NavBar);
