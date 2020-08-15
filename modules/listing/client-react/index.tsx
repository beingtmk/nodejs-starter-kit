import React from 'react';
import { Menu, Icon } from 'antd';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';

const { SubMenu } = Menu;

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

const NavLinkMyListingsBookmark = () => {
  return (
    <NavLink to="/my-listings-bookmark">
      <div>
        <Icon type="star" /> {'My Listings Bookmarks'}
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
  <NavLink to="/listings" className="nav-link" activeClassName="active">
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
      path="/listings"
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
    />,
    <AuthRoute
      redirect="/profile"
      role={['user', 'admin']}
      exact
      path="/my-listings-bookmark"
      component={loadable(() => import('./containers/MyListingBookmarks').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key="/listings">
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
    <IfLoggedIn key="/listings">
      <SubMenu
        key="/listing"
        title={
          <span>
            <Icon type="solution" />
            <span>Listing</span>
          </span>
        }
      >
        <MenuItem>
          <MyListingsNavItemAccount />
        </MenuItem>
        <MenuItem>
          <NavLinkMyListingsBookmark />
        </MenuItem>
      </SubMenu>
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
