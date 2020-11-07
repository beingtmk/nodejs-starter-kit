import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('category')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/category" className="nav-link" activeClassName="active">
    {t('category:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/category" component={loadable(() => import('./containers/Category').then(c => c.default))} />
  ],
  navItemBrowse: [
    <MenuItem key="/category">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'category', resources }]
});
