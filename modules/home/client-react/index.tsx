import React from "react";

import ClientModule from "@gqlapp/module-client-react";
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from "@loadable/component";
import { PageLoading } from "@gqlapp/look-client-react";
import { Route } from "react-router-dom";
import resources from "./locales";
import pMinDelay from 'p-min-delay'

// const NavLinkWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/home" className="nav-link" activeClassName="active">
//     {t('home:navLink')}
//   </NavLink>
// ));

const LoadableHome = loadable(() => import("./containers/Home"), {
  fallback: <PageLoading />,
});

export default new ClientModule({
  route: [
    <Route exact path="/" component={LoadableHome} />,
    <Route
      exact
      path="/home1"
      component={loadable(() =>
        import("./components/HomeView1").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/home2"
      component={loadable(() =>
        import("./components/HomeView2").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/home3"
      component={loadable(() =>
        import("./components/HomeView3").then((c) => c.default)
      )}
    />,
  ],

  localization: [{ ns: "home", resources }],
});
