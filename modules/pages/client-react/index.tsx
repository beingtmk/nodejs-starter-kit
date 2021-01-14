import React from 'react';
import {
  Route
  // , NavLink
} from 'react-router-dom';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';
// import { MenuItem } from '@gqlapp/look-client-react';
import { Spinner } from '@gqlapp/look-client-react';

import ROUTES from './routes';
import resources from './locales';

export { default as PAGES_ROUTES } from './routes';

// const NavLinkWithI18n = translate('pages')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/pages" className="nav-link" activeClassName="active">
//     {t('pages:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  route: [
    // <Route exact path="/pages" component={loadable(() => import('./containers/Pages').then(c => c.default), { fallback: <Spinner /> })} />,
    <Route
      exact
      path={ROUTES.aboutUs}
      component={loadable(() => import('./containers/AboutUs').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.faq}
      component={loadable(() => import('./containers/Faq').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.termsOfService}
      component={loadable(() => import('./containers/TermsOfService').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.privacyPolicy}
      component={loadable(() => import('./containers/PrivacyPolicy').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.email}
      component={loadable(() => import('./containers/Email').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  // navItem: [
  //   <MenuItem key="/pages">
  //     <NavLinkWithI18n />
  //   </MenuItem>,
  // ],
  localization: [{ ns: 'pages', resources }]
});
