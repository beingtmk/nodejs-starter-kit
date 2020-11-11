import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import loadable from '@loadable/component';

import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';
import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { MenuItem } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';

const NavLinkAdminWithI18n = translate('category')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    {t('category:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Categories.web').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.add}
      component={loadable(() => import('./containers/AddCategory').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.edit}
      component={loadable(() => import('./containers/EditCategory').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.category}
      component={loadable(() => import('./containers/Category').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'category', resources }]
});
