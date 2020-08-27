import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';
import ROUTES from './routes';

// const NavLinkWithI18n = translate('review')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/review" className="nav-link" activeClassName="active">
//     {t('review:navLink')}
//   </NavLink>
// ));

const NavLinkAdminWithI18n = translate('review')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    {t('review:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path={ROUTES.add} component={loadable(() => import('./containers/AddReview').then(c => c.default))} />,
    <Route
      exact
      path={ROUTES.edit}
      component={loadable(() => import('./containers/EditReview').then(c => c.default))}
    />,
    <Route exact path="/review" component={loadable(() => import('./containers/Review').then(c => c.default))} />,
    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Reviews.web').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItem: [
    // <MenuItem key="/review">
    //   <NavLinkWithI18n />
    // </MenuItem>
  ],
  localization: [{ ns: 'review', resources }]
});
