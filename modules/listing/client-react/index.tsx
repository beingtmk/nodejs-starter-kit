import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';

import resources from './locales';

const NavLinkTestWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/listing_catalogue" className="nav-link" activeClassName="active">
    {t('listing:navLink')}
  </NavLink>
));

const NavLinkAdminWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/listing" className="nav-link" activeClassName="active">
    {t('listing:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      role={['admin']}
      path="/listing"
      component={loadable(() => import('./containers/Listing.web').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['admin', 'user']}
      path="/new/listing"
      component={loadable(() => import('./containers/AddListing.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/listing_catalogue"
      component={loadable(() => import('./containers/ListingCatalogue.web').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key="/listing">
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemTest: [
    <MenuItem key="/listing_catalogue">
      <NavLinkTestWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'listing', resources }]
});
