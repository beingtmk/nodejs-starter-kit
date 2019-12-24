import React from 'react';
import { MenuItem } from '@gqlapp/look-client-react';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import resources from './locales';

// const NavLinkWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/home" className="nav-link" activeClassName="active">
//     {t('home:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  route: [
    <Route exact path="/home" component={loadable(() => import('./containers/Home').then(c => c.default))} />,
    <Route exact path="/home1" component={loadable(() => import('./components/HomeView1').then(c => c.default))} />
  ],
  navItemRight: [
    <MenuItem key="/home1">
      <NavLink to="/home1" className="nav-link" activeClassName="active">
        Home1
      </NavLink>
    </MenuItem>
  ],
  localization: [{ ns: 'home', resources }]
});
