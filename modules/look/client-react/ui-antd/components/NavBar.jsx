import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Row, Col, Icon } from 'antd';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';

import settings from '@gqlapp/config';

import MenuItem from './MenuItem';
import LoggedIn from '../auth/LoggedIn';
import DropDown from './Dropdown';

const { SubMenu } = Menu;

const ref = { modules: null };

export const onAppCreate = async modules => (ref.modules = modules);

class NavBar extends React.Component {
  state = {
    current: '/'
  };

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
      <Row gutter={0}>
        <Col lg={6} md={14} sm={14} xs={14}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
          >
            <MenuItem key="/">
              <NavLink to="/" className="nav-link">
                {settings.app.name}
              </NavLink>
            </MenuItem>
          </Menu>
        </Col>
        <Col lg={8} md={0} sm={0} xs={0}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
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

            {ref.modules.navItems}
          </Menu>
        </Col>
        <Col lg={10} md={10} xs={0} sm={0} align="right">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
          >
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
        <Col md={0} sm={10} xs={10} align="right">
          <div onClick={this.showDrawer}>
            <Icon type="menu" style={{ color: 'white', fontSize: '20px' }} />
          </div>
        </Col>
        <Drawer placement="right" onClose={this.onClose} visible={this.state.visible}>
          <Menu mode="inline" selectedKeys={[this.props.location.pathname]} theme="dark" style={{ lineHeight: '64px' }}>
            {ref.modules.navItemsRight}
            <LoggedIn>
              <div style={{ height: '100px' }} align="left">
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
