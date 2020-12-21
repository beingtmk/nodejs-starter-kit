import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { Icon, MenuItem, Spinner, SubMenu } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';
import { default as USER_ROUTES } from '@gqlapp/user-client-react/routes';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';

const MyListingsNavItemAccount = () => {
  return (
    <NavLink to={ROUTES.myListing}>
      <Icon type="SolutionOutlined" />
      {'My Listings'}
    </NavLink>
  );
};

const NavLinkMyListingsBookmark = () => {
  return (
    <NavLink to={ROUTES.listingBookmark}>
      <Icon type="StarOutlined" />
      {'My Bookmarks'}
    </NavLink>
  );
};

const NavLinkAddListings = () => {
  return (
    <NavLink to={ROUTES.add}>
      <Icon type="SolutionOutlined" />
      {'Create listing'}
    </NavLink>
  );
};

// const NavLinkMyListingsWithI18n = translate('listing')(({ t }) => (
//   <NavLink to={ROUTES.myListing} className=" AccDetItem" activeClassName="AccDetItemSelected">
//     <Icon style={{ paddingRight: '5px' }} type="solution" />
//     {t('listing:navLinkMyListings')}
//   </NavLink>
// ));

const NavLinkTestWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.listingCatalogue} className="nav-link" activeClassName="active">
    <Icon type="SolutionOutlined" />
    {t('listing:navLink')}
  </NavLink>
));

const NavLinkAdminWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="SolutionOutlined" />
    {t('listing:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Listing.web').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <Route
      exact
      path={ROUTES.listingCatalogue}
      component={loadable(() => import('./containers/ListingCatalogue.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <Route
      exact
      path={ROUTES.categoryCatalogue}
      component={loadable(() => import('./containers/CategoryCatalogue').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <Route
      exact
      path={ROUTES.listingReview}
      component={loadable(() => import('./containers/ListingReview').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <AuthRoute
      redirect={USER_ROUTES.profile}
      role={['user', 'admin']}
      exact
      path={ROUTES.myListing}
      component={loadable(() => import('./containers/MyListings').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.listingDetail}
      component={loadable(() => import('./containers/ListingDetail').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      redirect={USER_ROUTES.profile}
      role={['user', 'admin']}
      exact
      path={ROUTES.listingBookmark}
      component={loadable(() => import('./containers/MyListingBookmarks').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,

    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.add}
      component={loadable(() => import('./containers/AddListing.web').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.edit}
      component={loadable(() => import('./containers/EditListing.web').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  // navItemTest: [
  //   <MenuItem key={ROUTES.listingCatalogue}>
  //     <NavLinkTestWithI18n />
  //   </MenuItem>
  // ],
  navItemBrowse: [
    <MenuItem key={ROUTES.listingCatalogue}>
      <NavLinkTestWithI18n />
    </MenuItem>
  ],
  navItemUser: [
    <IfLoggedIn>
      <SubMenu
        key="/listing"
        title={
          <>
            <Icon type="SolutionOutlined" />
            Listing
          </>
        }
      >
        <MenuItem>
          <NavLinkAddListings />
        </MenuItem>
        <MenuItem>
          <NavLinkMyListingsBookmark />
        </MenuItem>
        <MenuItem>
          <MyListingsNavItemAccount />
        </MenuItem>
      </SubMenu>
    </IfLoggedIn>
  ],
  // navItemAccount: [
  //   <IfLoggedIn key={ROUTES.myListing}>
  //     <MenuItem>
  //       <NavLinkMyListingsWithI18n />
  //     </MenuItem>
  //   </IfLoggedIn>
  // ],
  resolver: [resolvers],
  localization: [{ ns: 'listing', resources }]
});
