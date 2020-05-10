import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('quiz')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/quiz" className="nav-link" activeClassName="active">
    {t('quiz:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
  <Route exact path="/quiz" component={loadable(() => import('./containers/Quiz').then(c => c.default))} />,
  <Route exact path="/quiz/add" component={loadable(() => import('./containers/QuizAdd').then(c => c.default))} />,
  <Route exact path="/quiz/edit/:id" component={loadable(() => import('./containers/QuizEdit').then(c => c.default))} />,
],
  navItem: [
    <MenuItem key="/quiz">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'quiz', resources }]
});
