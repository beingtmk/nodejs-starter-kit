import React from 'react';
import { Menu } from 'antd';
import { Route, NavLink } from 'react-router-dom';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react';
import loadable from '@loadable/component';
import { MenuItem } from '@gqlapp/look-client-react';

import resolvers from './resolvers';
import resources from './locales';

// const NavLinkWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/home" className="nav-link" activeClassName="active">
//     {t('home:navLink')}
//   </NavLink>
// ));

const NavLinkDynamicCarouselComponentWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/component/dynamic-carousel" className="nav-link" activeClassName="active">
    {'Dynamic Carousel Component'}
  </NavLink>
));

const NavLinkDynamicCarouselWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/dynamic-carousel" className="nav-link" activeClassName="active">
    Dynamic Carousel
  </NavLink>
));

const { SubMenu } = Menu;

export default new ClientModule({
  route: [
    <Route exact path="/" component={loadable(() => import('./containers/Home').then(c => c.default))} />,
    <Route exact path="/home1" component={loadable(() => import('./components/HomeView1').then(c => c.default))} />,
    <Route exact path="/home2" component={loadable(() => import('./components/HomeView2').then(c => c.default))} />,
    <Route exact path="/home3" component={loadable(() => import('./components/HomeView3').then(c => c.default))} />,
    <Route exact path="/home4" component={loadable(() => import('./components/HomeView4').then(c => c.default))} />,

    // Dynamic Carousel
    <AuthRoute
      exact
      path="/dynamic-carousel"
      redirect="/profile"
      role="admin"
      component={loadable(() => import('./containers/DCComponents/DynamicCarousel.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/new/dynamic-carousel"
      component={loadable(() => import('./containers/DCComponents/AddDynamicCarousel').then(c => c.default))}
    />,
    <Route
      exact
      path="/edit/dynamic-carousel/:id"
      component={loadable(() => import('./containers/DCComponents/EditDynamicCarousel').then(c => c.default))}
    />,
    <Route
      exact
      path="/component/dynamic-carousel"
      component={loadable(() => import('./containers/DCComponents/DynamicCarouselComponent').then(c => c.default))}
    />
  ],

  navItemTest: [
    <SubMenu title="Home" key="/home">
      <MenuItem key="/component/dynamic-carousel">
        <MenuItem>
          <NavLinkDynamicCarouselComponentWithI18n />
        </MenuItem>
      </MenuItem>
    </SubMenu>
  ],
  navItemAdmin: [
    <IfLoggedIn key="/home" role="admin">
      <SubMenu title="Home">
        <MenuItem key="/dynamic-carousel">
          <NavLinkDynamicCarouselWithI18n />
        </MenuItem>
      </SubMenu>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'home', resources }]
});
