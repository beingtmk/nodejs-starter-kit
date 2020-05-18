import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
// import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import loadable from '@loadable/component';
// import { CookiesProvider } from 'react-cookie';
// import resolvers from './resolvers';

// import { NavLink } from "react-router-dom";
// import { MenuItem } from "@gqlapp/look-client-react";
import resources from './locales';
import {
  AuthRoute
  // IfLoggedIn,
} from '@gqlapp/user-client-react/containers/Auth.web';

// const NavLinkWithI18n = translate("group")(
//   ({ t }: { t: TranslateFunction }) => (
//     <NavLink to="/group" className="nav-link" activeClassName="active">
//       {t("group:navLink")}
//     </NavLink>
//   )
// );

export default new ClientModule({
  route: [
    // <AuthRoute
    //   exact
    // redirect="/profile"
    //   role={['user', 'admin']}
    //   path="/my-groups"
    //   component={loadable(() =>
    //     import("./containers/MyGroups").then((c) => c.default)
    //   )}
    // />,
    // <AuthRoute
    //   exact
    //   role={["admin"]}
    //   redirect="/profile"
    //   path="/group/admin-list"
    //   component={loadable(() =>
    //     import("./containers/AdminGroups").then((c) => c.default)
    //   )}
    // />,
    <AuthRoute
      exact
      role={['user', 'admin']}
      path="/group/new"
      redirect="/profile"
      component={loadable(() => import('./containers/AddNewGroup').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['user', 'admin']}
      redirect="/profile"
      path="/group/edit/:id"
      component={loadable(() => import('./containers/EditGroup').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['user', 'admin']}
      path="/group/:id"
      redirect="/profile"
      component={loadable(() => import('./containers/Group').then(c => c.default))}
    />
  ],
  // navItem: [
  //   <MenuItem key="/group">
  //     <NavLinkWithI18n />
  //   </MenuItem>
  // ],
  localization: [{ ns: 'group', resources }]
});
