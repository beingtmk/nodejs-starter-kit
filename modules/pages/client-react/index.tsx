import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('pages')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/pages" className="nav-link" activeClassName="active">
    {t('pages:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/pages" component={loadable(() => import('./containers/Pages').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/pages">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'pages', resources }]
});
