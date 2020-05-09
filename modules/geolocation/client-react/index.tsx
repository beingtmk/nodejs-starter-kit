import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';

import resolvers from './resolvers';
import resources from './locales';
import { CookiesProvider } from 'react-cookie';

const NavLinkWithI18n = translate('geolocation')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/geolocation" className="nav-link" activeClassName="active">
    {t('geolocation:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/geolocation" component={loadable(() => import('./containers/Geolocation').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/geolocation">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'geolocation', resources }],
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
