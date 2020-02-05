import React from 'react';

import loadable from '@loadable/component';
import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';
// import { AuthRoute } from '@gqlapp/users-client-react/';

const NavLinkWithI18n = translate('events')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/events" className="nav-link" activeClassName="active">
    {t('events:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/events" component={loadable(() => import('./containers/Events').then(c => c.default))} />,
    <Route
      exact
      path="/add-event"
      component={loadable(() => import('./containers/AddEvent.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/edit-event/:id"
      component={loadable(() => import('./containers/EditEvent.web').then(c => c.default))}
    />
    // ,<AuthRoute
    //   exact
    //   path="/add-event"
    //   role={['user', 'admin']}
    //   redirect="/login"
    //   component={loadable(() =>
    //     import('./containers/AddEvent').then(c => c.default)
    //   )}
    // />
  ],

  navItemTest: [
    <MenuItem key="/events">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'events', resources }]
});
