import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('group')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/group" className="nav-link" activeClassName="active">
    {t('group:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/group" component={loadable(() => import('./containers/Group').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/group">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'group', resources }]
});
