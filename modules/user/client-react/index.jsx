import React from 'react';
import { Icon } from 'antd';

import { CookiesProvider } from 'react-cookie';
import { NavLink, withRouter, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { translate } from '@gqlapp/i18n-client-react';
import { MenuItem } from '@gqlapp/look-client-react';
import ClientModule from '@gqlapp/module-client-react';

import resolvers from './resolvers';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLoadedUser, withLogout } from './containers/Auth';
import CurrentUserWrapper from './containers/CurrentUserWrapper';

export { CurrentUserWrapper };


const ProfileName = withLoadedUser(({ currentUser }) => {
  return (
    <>
      <Icon type="user" /> {currentUser ? currentUser.fullName || currentUser.username : null}
    </>
  );
});

const LogoutLink = withRouter(
  withLogout(
    translate('user')(({ logout, history, t }) => (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          (async () => {
            await logout();
            history.push('/logout-page');
          })();
        }}
        className="nav-link"
      >
        <Icon type="logout" /> {t('navLink.logout')}
      </a>
    ))
  )
);

export * from './containers/Auth';
export { default as LOGIN } from './graphql/Login.graphql';

const NavLinkUsersWithI18n = translate('user')(({ t }) => (
  <NavLink to="/users" className="nav-link" activeClassName="active">
    {t('navLink.users')}
  </NavLink>
));
const NavLinkLoginWithI18n = translate('user')(({ t }) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    <Icon type="login" />
    {t('navLink.signIn')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route
      exact
      path="/logout-page"
      component={loadable(() =>
        import("./containers/LogoutPage").then((c) => c.default)
      )}
    />,
    <AuthRoute
      exact
      path="/profile"
      role={['user', 'admin']}
      redirect="/login"
      component={loadable(() => import('./containers/Profile').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/users"
      redirect="/profile"
      role="admin"
      component={loadable(() => import('./containers/Users').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/users/new"
      role={['admin']}
      component={loadable(() => import('./containers/UserAdd').then(c => c.default))}
    />,
    <AuthRoute
      path="/users/:id"
      redirect="/profile"
      role={['user', 'admin']}
      component={loadable(() => import('./containers/UserEdit').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/register"
      redirectOnLoggedIn
      redirect="/profile"
      component={loadable(() => import('./containers/Register').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/login"
      redirectOnLoggedIn
      redirect="/"
      component={loadable(() => import('./containers/Login').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/forgot-password"
      redirectOnLoggedIn
      redirect="/profile"
      component={loadable(() => import('./containers/ForgotPassword').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/reset-password/:token"
      redirectOnLoggedIn
      redirect="/profile"
      component={loadable(() => import('./containers/ResetPassword').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn key="/users" role="admin">
      <MenuItem>
        <NavLinkUsersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],

  navItemUser: [
    <IfLoggedIn key="/profile">
      <MenuItem>
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <ProfileName />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>,
    <IfLoggedIn key="/logout">
      <MenuItem>
        <LogoutLink />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemRight: [
    <IfNotLoggedIn key="/login">
      <MenuItem>
        <NavLinkLoginWithI18n />
      </MenuItem>
    </IfNotLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'user', resources }],
  dataRootComponent: [DataRootComponent],
  // eslint-disable-next-line react/display-name
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
