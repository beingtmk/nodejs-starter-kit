import React from 'react';
import styled from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { NavLink, withRouter, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import { translate } from '@gqlapp/i18n-client-react';
import { Icon, MenuItem, Spinner } from '@gqlapp/look-client-react';
import ClientModule from '@gqlapp/module-client-react';
// eslint-disable-next-line import/no-named-default
import { default as HOME_ROUTES } from '@gqlapp/home-client-react/routes';

import ROUTES from './routes';
import resolvers from './resolvers';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLoadedUser, withLogout } from './containers/Auth';

export { default as USER_ROUTES } from './routes';

const NavLinkSignIn = styled(NavLink)`
  color: unset;
  &:hover {
    color: rgb(0, 98, 190);
  }
`;

const ProfileName = withLoadedUser(({ currentUser }) => {
  return (
    <>
      <Icon type="UserOutlined" /> {currentUser ? currentUser.fullName || currentUser.username : null}
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
            history.push(`${ROUTES.logoutPage}`);
          })();
        }}
        className="nav-link"
      >
        <Icon type="LogoutOutlined" /> {t('navLink.logout')}
      </a>
    ))
  )
);

export * from './containers/Auth';
export { default as LOGIN } from './graphql/Login.graphql';

const NavLinkUsersWithI18n = translate('user')(({ t }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="UserOutlined" />
    {t('navLink.users')}
  </NavLink>
));
const NavLinkLoginWithI18n = translate('user')(({ t }) => (
  <NavLinkSignIn to={ROUTES.login}>
    <Icon type="LoginOutlined" /> &nbsp;
    {t('navLink.signIn')}
  </NavLinkSignIn>
));
const NavLinkTestWithI18n = translate('user')(({ t }) => (
  <NavLink to={ROUTES.userList} className="nav-link" activeClassName="active">
    <Icon type="UserOutlined" />
    {t('navLink.users')}
  </NavLink>
));
export default new ClientModule({
  route: [
    <AuthRoute
      exact
      path={ROUTES.profile}
      role={['user', 'admin']}
      redirect={ROUTES.login}
      component={loadable(() => import('./containers/Profile').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      path={ROUTES.adminPanel}
      redirect={ROUTES.profile}
      role="admin"
      component={loadable(() => import('./containers/Users').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      path={ROUTES.add}
      role={['admin']}
      component={loadable(() => import('./containers/UserAdd').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      path={ROUTES.edit}
      redirect={ROUTES.profile}
      role={['user', 'admin']}
      component={loadable(() => import('./containers/UserEdit').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      path={ROUTES.register}
      redirectOnLoggedIn
      redirect={ROUTES.profile}
      component={loadable(() => import('./containers/Register').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      path={ROUTES.login}
      redirectOnLoggedIn
      redirect={HOME_ROUTES.home}
      component={loadable(() => import('./containers/Login').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.logoutPage}
      redirect={HOME_ROUTES.home}
      component={loadable(() => import('./containers/LogoutPage').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      path={ROUTES.forgotPassword}
      redirectOnLoggedIn
      redirect={ROUTES.profile}
      component={loadable(() => import('./containers/ForgotPassword').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      path={ROUTES.resetPassword}
      redirectOnLoggedIn
      redirect={ROUTES.profile}
      component={loadable(() => import('./containers/ResetPassword').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.userPublicProfile}
      component={loadable(() => import('./containers/PublicProfile').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.userList}
      component={loadable(() => import('./containers/UsersProfileCatalogue').then(c => c.default), {
        fallback: <Spinner />
      })}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn key={ROUTES.adminPanel} role="admin">
      <MenuItem>
        <NavLinkUsersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemTest: [
    <MenuItem key={ROUTES.userList}>
      <NavLinkTestWithI18n />
    </MenuItem>
  ],
  navItemUser: [
    <IfLoggedIn key={ROUTES.profile}>
      <MenuItem>
        <NavLink to={ROUTES.profile} className="nav-link" activeClassName="active">
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
    <IfNotLoggedIn key={ROUTES.login}>
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
