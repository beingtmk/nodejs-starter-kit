import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('comment')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/comment" className="nav-link" activeClassName="active">
    {t('comment:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/comment" component={loadable(() => import('./containers/Comment').then(c => c.default))} />
  ],
  navItem: [
    <MenuItem key="/comment">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'comment', resources }]
});
