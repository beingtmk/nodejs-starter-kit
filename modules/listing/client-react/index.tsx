import React from 'react';
import { Icon } from 'antd';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';

import resources from './locales';
const MyListingsNavItemAccount = () => {
  return (
    <NavLink to="/my-listings">
      <div>
        <Icon type="solution" /> {'My Listings'}
      </div>
    </NavLink>
  );
};

const NavLinkMyListingsWithI18n = translate('listing')(({ t }) => (
  <NavLink to="/my-listings" className=" AccDetItem" activeClassName="AccDetItemSelected">
    <Icon style={{ paddingRight: '5px' }} type="solution" />
    {t('listing:navLinkMyListings')}
  </NavLink>
));

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
    <Route
      exact
      path="/listing-detail/:id"
      component={loadable(() => import('./containers/ListingDetail').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['admin']}
      path="/listing"
      component={loadable(() => import('./containers/Listing.web').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['admin', 'user']}
      path="/edit/listing/:id"
      component={loadable(() => import('./containers/EditListing.web').then(c => c.default))}
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
    />,
    <AuthRoute
      redirect="/profile"
      role={['user', 'admin']}
      exact
      path="/my-listings"
      component={loadable(() => import('./containers/MyListings').then(c => c.default))}
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
  navItemUser: [
    <IfLoggedIn key="/my-listings">
      <MenuItem>
        <MyListingsNavItemAccount />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemAccount: [
    <IfLoggedIn key="/my-listings">
      <MenuItem>
        <NavLinkMyListingsWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'listing', resources }]
});
