import React from 'react';
import { Menu } from 'antd';
import { Route, NavLink } from 'react-router-dom';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react';
import loadable from '@loadable/component';
import { MenuItem } from '@gqlapp/look-client-react';

import resources from './locales';

// const NavLinkWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/home" className="nav-link" activeClassName="active">
//     {t('home:navLink')}
//   </NavLink>
// ));

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

    <AuthRoute
      exact
      path="/dynamic-carousel"
      redirect="/profile"
      role="admin"
      component={loadable(() => import('./containers/DynamicCarousel.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/new/dynamic-carousel"
      component={loadable(() => import('./containers/AddDynamicCarousel').then(c => c.default))}
    />,
    <Route
      exact
      path="/edit/dynamic-carousel/:id"
      component={loadable(() => import('./containers/EditDynamicCarousel').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn key="/dynamic-carousel" role="admin">
      <SubMenu title="Home">
        <MenuItem>
          <NavLinkDynamicCarouselWithI18n />
        </MenuItem>
      </SubMenu>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'home', resources }]
});
