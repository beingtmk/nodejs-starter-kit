import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/new" className="nav-link" activeClassName="active">
    {'Add New Blog'}
  </NavLink>
));
const NavLinkMyBlogsWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/my-blogs" className="nav-link" activeClassName="active">
    {'My Blogs'}
  </NavLink>
));
const NavLinkMyBookmarksWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/my-bookmarks" className="nav-link" activeClassName="active">
    {'My Bookmarks'}
  </NavLink>
));
export default new ClientModule({
  route: [
    <Route exact path="/blog/new" component={loadable(() => import('./containers/NewBlog').then(c => c.default))} />,
    <Route exact path="/my-blogs" component={loadable(() => import('./containers/Myblogs').then(c => c.default))} />,
    <Route
      exact
      path="/my-bookmarks"
      component={loadable(() => import('./containers/MyBookmarks').then(c => c.default))}
    />,
    <Route exact path="/blog/" component={loadable(() => import('./containers/Blog').then(c => c.default))} />
  ],
  navItem: [
    <MenuItem key="/blog/new">
      <NavLinkWithI18n />
    </MenuItem>,
    <MenuItem key="/my-blogs">
      <NavLinkMyBlogsWithI18n />
    </MenuItem>,
    <MenuItem key="/my-bookmarks">
      <NavLinkMyBookmarksWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'blog', resources }]
});
