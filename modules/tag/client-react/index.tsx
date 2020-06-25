// import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
// import loadable from '@loadable/component';

// import { Route, NavLink } from 'react-router-dom';
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

// const NavLinkWithI18n = translate('tag')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/tag" className="nav-link" activeClassName="active">
//     {t('tag:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  // route: [<Route exact path="/tag" component={loadable(() => import('./containers/Tag').then(c => c.default))} />],
  // navItem: [
  //   <MenuItem key="/tag">
  //     <NavLinkWithI18n />
  //   </MenuItem>
  // ],
  localization: [{ ns: 'tag', resources }]
});
