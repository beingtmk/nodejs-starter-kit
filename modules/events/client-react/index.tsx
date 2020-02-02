import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('events')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/events" className="nav-link" activeClassName="active">
    {t('events:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/events" component={loadable(() => import('./containers/Events').then(c => c.default))} />
  ],
  navItemTest: [
    <MenuItem key="/events">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'events', resources }]
});
