import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Icon, Row, Col } from 'antd';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import { enquireScreen } from 'enquire-js';

import MenuItem from './MenuItem';
import LoggedIn from '../auth/LoggedIn';
import DropDown from './Dropdown';

const { SubMenu } = Menu;

const ref = { modules: null };

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export const onAppCreate = async modules => (ref.modules = modules);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/',
      isMobile,
      show: true //!location.port, ToDo - find a better approach this
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen(b => {
      this.setState({ isMobile: !!b });
    });
    // ToDo - find a better approach for below statement
    // if (true) {

    setTimeout(() => {
      this.setState({
        show: true
      });
    }, 500);
    // }
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
    return (
      <Row className="navbar-wrapper">
        <Col lg={24} xs={0}>
          <div align="right" className="navbar-contact-menu">
            <Row style={{ lineHeight: '37px' }}>
              <Col span={10} />
              <Col span={6}>
                <Icon type="phone" /> +919870731381
              </Col>
              <Col span={8}>
                <Icon type="mail" /> rajatgoyalcoachingclasses@gmail.com
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <Row>
            <Col align="left" xs={12} md={12} lg={7}>
              <NavLink to="/" className="nav-link">
                <ScrollParallax
                  location="page-layout"
                  className="navbar-logo-lg"
                  animation={{
                    playScale: [1, 1.5],
                    scale: this.state.isMobile ? '' : 0.5,
                    translateY: this.state.isMobile ? '' : '18px'
                  }}
                >
                  <img
                    height="100%"
                    src={
                      'https://res.cloudinary.com/www-lenshood-in/image/upload/v1579772806/nodejs-starterkit/raphael_node-js_simple-blue_512x512.png'
                    }
                    alt="Mountain"
                  />
                </ScrollParallax>
              </NavLink>
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
                    <DropDown type="safety-certificate">{ref.modules.navItemsAdmin}</DropDown>
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
              <div onClick={this.showDrawer} style={{ height: '50px' }}>
                <Icon
                  type="menu"
                  style={{
                    color: 'black',
                    fontSize: '20px',
                    position: 'absolute',
                    top: '15px',
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
              <SubMenu key="test" style={{ color: 'black !important' }} title={<MenuItem>Dev</MenuItem>}>
                {ref.modules.navItemsTest}
                <MenuItem>
                  <a href="/graphiql">GraphiQL</a>
                </MenuItem>
              </SubMenu>
            )}
            <LoggedIn role="admin">
              <SubMenu key="admin" title={<MenuItem>Admin</MenuItem>}>
                {ref.modules.navItemsAdmin}
              </SubMenu>
            </LoggedIn>
            {ref.modules.navItems}
          </Menu>
        </Drawer>
      </Row>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
