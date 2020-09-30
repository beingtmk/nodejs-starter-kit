import React from "react";

import ClientModule from "@gqlapp/module-client-react";
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from "@loadable/component";

import {
  Route,
  // NavLink
} from "react-router-dom";
// import { MenuItem } from '@gqlapp/look-client-react';
import resources from "./locales";

export default new ClientModule({
  route: [
    <Route
      exact
      path="/terms-of-service"
      component={loadable(() =>
        import("./containers/TermsOfService").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/about-us"
      component={loadable(() =>
        import("./containers/AboutUs").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/privacy-policy"
      component={loadable(() =>
        import("./containers/PrivacyPolicy").then((c) => c.default)
      )}
    />,
  ],

  localization: [{ ns: "pages", resources }],
});
