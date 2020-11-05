import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route /* NavLink */ } from 'react-router-dom';
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

// const NavLinkWithI18n = translate('discount')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/discount" className="nav-link" activeClassName="active">
//     {t('discount:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  route: [
    <Route exact path="/discount" component={loadable(() => import('./containers/Discount').then(c => c.default))} />
  ],
  // navItemAdmin: [
  //   <MenuItem key="/discount">
  //     <NavLinkWithI18n />
  //   </MenuItem>
  // ],
  localization: [{ ns: 'discount', resources }]
});
