import React from 'react';
// import { Icon } from 'antd';

import {
  Route
  // NavLink
} from 'react-router-dom';
import loadable from '@loadable/component';

// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import ClientModule from '@gqlapp/module-client-react';
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

// const NavLinkWithI18n = translate('contact')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/contact" className="nav-link" activeClassName="active">
//     <Icon type="contacts" /> {t('navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  route: [
    <Route exact path="/contact" component={loadable(() => import('./containers/Contact').then(c => c.default))} />,
    <Route exact path="/about-us" component={loadable(() => import('./containers/AboutUs').then(c => c.default))} />
    // <Route exact path="/faq" component={loadable(() => import('./containers/Faq').then(c => c.default))} />,
    // <Route exact path="/terms-of-service" component={loadable(() => import('./containers/TermsOfService').then(c => c.default))} />,
    // <Route exact path="/privacy-policy" component={loadable(() => import('./containers/PrivacyPolicy').then(c => c.default))} />,
  ],

  localization: [{ ns: 'contact', resources }]
});
