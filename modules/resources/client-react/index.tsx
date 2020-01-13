import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('resources')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/resources" className="nav-link" activeClassName="active">
    {t('resources:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route
      exact
      path="/edit-resource/:id"
      component={loadable(() => import('./containers/EditResource').then(c => c.default))}
    />,
    <Route
      exact
      path="/add-resources"
      component={loadable(() => import('./containers/AddResources').then(c => c.default))}
    />,
    <Route exact path="/resources" component={loadable(() => import('./containers/Resources').then(c => c.default))} />
  ],
  navItemTest: [
    <MenuItem key="/resources">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'resources', resources }]
});
