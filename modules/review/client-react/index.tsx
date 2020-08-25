import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('review')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/review" className="nav-link" activeClassName="active">
    {t('review:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/review" component={loadable(() => import('./containers/Review').then(c => c.default))} />
  ],
  navItem: [
    <MenuItem key="/review">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'review', resources }]
});
