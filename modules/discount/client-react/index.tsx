import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';
import { MenuItem, Spinner } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';

import resources from './locales';
import resolvers from './resolvers';
import ROUTES from './routes';

const NavLinkWithI18n = translate('discount')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    {t('discount:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Discounts.web').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.add}
      component={loadable(() => import('./containers/AddDiscount.web').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.edit}
      component={loadable(() => import('./containers/EditDiscount.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'discount', resources }]
});
