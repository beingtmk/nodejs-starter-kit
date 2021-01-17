import React from 'react';
import { NavLink } from 'react-router-dom';
import loadable from '@loadable/component';

import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';
import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { Icon, MenuItem, Spinner } from '@gqlapp/look-client-react';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';

export { default as CATEGORY_ROUTES } from './routes';
export * from './containers';
export * from './components';

const NavLinkAdminWithI18n = translate('category')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="ProfileOutlined" />
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
