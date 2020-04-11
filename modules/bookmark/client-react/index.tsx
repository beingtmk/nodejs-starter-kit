// import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
// import loadable from '@loadable/component';

// import { Route, NavLink } from 'react-router-dom';
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

// const NavLinkWithI18n = translate('bookmark')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/bookmark" className="nav-link" activeClassName="active">
//     {t('bookmark:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  // route: [
  //   <Route exact path="/bookmark" component={loadable(() => import('./containers/Bookmark').then(c => c.default))} />
  // ],
  // navItem: [
  //   <MenuItem key="/bookmark">
  //     <NavLinkWithI18n />
  //   </MenuItem>
  // ],
  localization: [{ ns: 'bookmark', resources }]
});
