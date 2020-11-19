import React from 'react';

// import { Icon } from '@gqlapp/look-client-react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { Spinner } from '@gqlapp/look-client-react';

// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import ClientModule from '@gqlapp/module-client-react';
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

// const NavLinkWithI18n = translate('contact')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/contact" className="nav-link" activeClassName="active">
//    <Icon type="ContactsOutlined" />{ t('navLink') }
//   </NavLink>
// ));

export default new ClientModule({
  route: [
    <Route
      exact
      path="/contact"
      component={loadable(() => import('./containers/Contact').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],

  localization: [{ ns: 'contact', resources }]
});
