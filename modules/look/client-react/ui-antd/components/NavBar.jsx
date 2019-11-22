import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Row, Col, Dropdown, Icon } from 'antd';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';

import settings from '@gqlapp/config';

import MenuItem from './MenuItem';

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
        <Col md={14} xs={20} sm={20}>
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
            {ref.modules.navItems}
            {__DEV__ && (
              <MenuItem>
                <a href="/graphiql">GraphiQL</a>
              </MenuItem>
            )}
          </Menu>
        </Col>
        <Col md={10} xs={0} sm={0} align="right">
          <Dropdown
            overlay={
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.props.location.pathname]}
                mode="horizontal"
                theme="dark"
                style={{ lineHeight: '64px' }}
              >
                {ref.modules.navItemsUser}
              </Menu>
            }
            trigger={['hover']}
          >
            <a className="ant-dropdown-link" href="#">
              <UserAvatar />
            </a>
          </Dropdown>
        </Col>
        <Col md={0} sm={4} xs={4} align="right">
          <div onClick={this.showDrawer}>
            <Icon type="menu" style={{ color: 'white' }} />
          </div>
        </Col>
        <Drawer placement="right" onClose={this.onClose} visible={this.state.visible}>
          <Menu mode="inline" selectedKeys={[this.props.location.pathname]}>
            {ref.modules.navItemsUser}
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
