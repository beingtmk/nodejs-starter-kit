import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('addresses')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/addresses" className="nav-link" activeClassName="active">
    {t('addresses:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/addresses" component={loadable(() => import('./containers/Addresses').then(c => c.default))} />,
    <Route exact path="/address" component={loadable(() => import('./containers/Address').then(c => c.default))} />
  ],
  navItemTest: [
    <MenuItem key="/addresses">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'addresses', resources }]
});
