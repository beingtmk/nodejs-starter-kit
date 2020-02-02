import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { MenuItem } from '@gqlapp/look-client-react';
import ClientModule from '@gqlapp/module-client-react';
import loadable from '@loadable/component';

import resources from './locales';

const NavLinkWithI18n = translate()(({ t }) => (
  <NavLink to="/notifications" className="nav-link" activeClassName="active">
    {t('notifications:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route
      exact
      path="/notifications"
      component={loadable(() => import('./containers/Notifications.web').then(c => c.default))}
    />
  ],
  navItemTest: [
    <MenuItem key="/notifications">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'notifications', resources }]
});
