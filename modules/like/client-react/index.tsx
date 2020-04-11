// import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
// import loadable from '@loadable/component';

// import { Route, NavLink } from 'react-router-dom';
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

// const NavLinkWithI18n = translate('like')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/like" className="nav-link" activeClassName="active">
//     {t('like:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  // route: [<Route exact path="/like" component={loadable(() => import('./containers/Like').then(c => c.default))} />],
  // navItem: [
  //   <MenuItem key="/like">
  //     <NavLinkWithI18n />
  //   </MenuItem>
  // ],
  localization: [{ ns: 'like', resources }]
});
