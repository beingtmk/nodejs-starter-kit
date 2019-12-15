import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/new" className="nav-link" activeClassName="active">
    {t('blog:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/blog/new" component={loadable(() => import('./containers/Blog').then(c => c.default))} />
  ],
  navItem: [
    <MenuItem key="/blog/new">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'blog', resources }]
});
