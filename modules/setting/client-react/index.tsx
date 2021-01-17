import React from 'react';
import loadable from '@loadable/component';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';
import { MenuItem, Icon, Spinner } from '@gqlapp/look-client-react';

import { /* Route, */ NavLink } from 'react-router-dom';
import resources from './locales';
import ROUTES from './routes';

export { default as SETTING_ROUTES } from './routes';

const NavLinkAdminWithI18n = translate('setting')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="SettingOutlined" />
    {t('setting:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Setting').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'setting', resources }]
});
