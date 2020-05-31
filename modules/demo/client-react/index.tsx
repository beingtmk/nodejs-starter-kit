import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('demo')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/home" className="nav-link" activeClassName="active">
    {t('demo:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/demo" component={loadable(() => import('./containers/Demo').then(c => c.default))} />,
    <Route
      exact
      path="/forgotpassword"
      component={loadable(() => import('./containers/PasswordReset').then(c => c.default))}
    />,
    <Route
      exact
      path="/home"
      component={loadable(() => import('./containers/ListingCatalogue').then(c => c.default))}
    />,
    <Route exact path="/baker" component={loadable(() => import('./containers/Baker').then(c => c.default))} />,
    <Route exact path="/login" component={loadable(() => import('./containers/Login').then(c => c.default))} />
  ],
  navItem: [
    <MenuItem key="/demo">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'demo', resources }]
});
