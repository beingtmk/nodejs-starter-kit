import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';
import { CookiesProvider } from 'react-cookie';
import resolvers from './resolvers';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';
import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';

const NavLinkMyGroupsWithI18n = translate('group')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/my-groups" className="nav-link" activeClassName="active">
    {'My Groups'}
  </NavLink>
));

const NavLinkNewWithI18n = translate('group')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/group/new" className="nav-link" activeClassName="active">
    {'Create Group'}
  </NavLink>
));

const NavLinkGroupAdminWithI18n = translate('group')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/group/admin-list" className="nav-link" activeClassName="active">
    {'All Groups'}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      redirect="/profile"
      role={['user', 'admin']}
      path="/my-groups"
      component={loadable(() => import('./containers/MyGroups').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['admin']}
      redirect="/profile"
      path="/group/admin-list"
      component={loadable(() => import('./containers/AdminGroups').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['user', 'admin']}
      path="/group/new"
      redirect="/profile"
      component={loadable(() => import('./containers/AddNewGroup').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['user', 'admin']}
      redirect="/profile"
      path="/group/edit/:id"
      component={loadable(() => import('./containers/EditGroup').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['user', 'admin']}
      path="/group/:id"
      redirect="/profile"
      component={loadable(() => import('./containers/Group').then(c => c.default))}
    />
  ],
  navItemUser: [
    <IfLoggedIn key="/my-groups">
      <Menu.SubMenu title="Groups">
        <MenuItem>
          <NavLinkMyGroupsWithI18n />
        </MenuItem>
      </Menu.SubMenu>
    </IfLoggedIn>
  ],
  navItemAdmin: [
    <Menu.SubMenu title="Groups">
      <IfLoggedIn key="/group/admin-list" role="admin">
        <MenuItem>
          <NavLinkGroupAdminWithI18n />
        </MenuItem>
      </IfLoggedIn>
    </Menu.SubMenu>
  ],
  navItemTest: [
    <IfLoggedIn key="/group/new">
      <Menu.SubMenu title="Groups">
        <MenuItem key="/blog/new">
          <NavLinkNewWithI18n />
        </MenuItem>
      </Menu.SubMenu>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)],
  localization: [{ ns: 'group', resources }]
});
