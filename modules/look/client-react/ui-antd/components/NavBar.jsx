import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'hedron';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Icon } from 'antd';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';
import Notifications from '@gqlapp/notifications-client-react/components/NotificationsComponent.web';

import settings from '@gqlapp/config';

import MenuItem from './MenuItem';
import LoggedIn from '../auth/LoggedIn';
import DropDown from './Dropdown';
// import Notification from './Notification';

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
      <Grid.Provider
        //  debug
        padding="0px"
        breakpoints={{ mobile: '-500', tablet: '501-768', wide: '+769' }}
      >
        <Grid.Bounds direction="horizontal">
          <Grid.Box shiftLeft>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
              theme="dark"
              style={{ lineHeight: '50px' }}
            >
              <MenuItem key="/">
                <NavLink to="/" className="nav-link">
                  {settings.app.name}
                </NavLink>
              </MenuItem>
            </Menu>
          </Grid.Box>
          <Grid.Box shiftLeft mobile={{ hidden: true }} tablet={{ hidden: true }}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
              theme="dark"
              style={{ lineHeight: '50px' }}
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
          </Grid.Box>
          <Grid.Box shiftRight mobile={{ hidden: true }} tablet={{ hidden: true }}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
              theme="dark"
              style={{ lineHeight: '50px' }}
            >
              {ref.modules.navItems}
              {ref.modules.navItemsRight}

              <LoggedIn>
                <MenuItem>
                  {/* <Notification /> */}
                  <Notifications />
                </MenuItem>
              </LoggedIn>
              <LoggedIn>
                <MenuItem>
                  <DropDown content={<UserAvatar />} noicon>
                    {ref.modules.navItemsUser}
                  </DropDown>
                </MenuItem>
              </LoggedIn>
            </Menu>
          </Grid.Box>
          <Grid.Box wide={{ hidden: true }}>
            <div onClick={this.showDrawer} style={{ height: '50px' }}>
              <Icon
                type="menu"
                style={{
                  color: 'white',
                  fontSize: '20px',
                  position: 'absolute',
                  top: '15px',
                  right: '15px'
                }}
              />
            </div>
          </Grid.Box>
          <Drawer placement="right" onClose={this.onClose} visible={this.state.visible}>
            <Menu
              mode="inline"
              selectedKeys={[this.props.location.pathname]}
              theme="dark"
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
        </Grid.Bounds>
      </Grid.Provider>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
