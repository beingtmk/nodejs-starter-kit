import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { USER_ROUTES, AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react';
import loadable from '@loadable/component';
import { Icon, MenuItem, Spinner, SubMenu } from '@gqlapp/look-client-react';

import ROUTES from './routes';
import resolvers from './resolvers';
import resources from './locales';

export { default as HOME_ROUTES } from './routes';

// const NavLinkWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/home" className="nav-link" activeClassName="active">
//     {t('home:navLink')}
//   </NavLink>
// ));

const NavLinkDynamicCarouselWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="BuildOutlined" />
    Dynamic Carousel
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route
      exact
      path={ROUTES.home}
      component={loadable(() => import('./containers/Home5').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.home1}
      component={loadable(() => import('./components/HomeView1').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.home2}
      component={loadable(() => import('./components/HomeView2').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.home3}
      component={loadable(() => import('./components/HomeView3').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.home4}
      component={loadable(() => import('./containers/Home4').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.home5}
      component={loadable(() => import('./containers/Home').then(c => c.default), { fallback: <Spinner /> })}
    />,

    // Dynamic Carousel
    <AuthRoute
      exact
      path={ROUTES.adminPanel}
      redirect={USER_ROUTES.profile}
      role="admin"
      component={loadable(() => import('./containers/DCComponents/DynamicCarousel.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <Route
      exact
      path={ROUTES.add}
      component={loadable(() => import('./containers/DCComponents/AddDynamicCarousel').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <Route
      exact
      path={ROUTES.edit}
      component={loadable(() => import('./containers/DCComponents/EditDynamicCarousel').then(c => c.default), {
        fallback: <Spinner />
      })}
    />
  ],

  // navItemTest: [],
  navItemAdmin: [
    <IfLoggedIn key="/home" role="admin">
      <SubMenu
        title={
          <>
            <Icon type="HomeOutlined" />
            Home
          </>
        }
      >
        <MenuItem key={ROUTES.adminPanel}>
          <NavLinkDynamicCarouselWithI18n />
        </MenuItem>
      </SubMenu>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'home', resources }]
});
