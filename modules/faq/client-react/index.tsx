import React from "react";
import { Icon } from "antd";
import ClientModule from "@gqlapp/module-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import loadable from "@loadable/component";

import { Route, NavLink } from "react-router-dom";
import { MenuItem } from "@gqlapp/look-client-react";
import resources from "./locales";
import resolvers from "./resolvers";

const NavLinkAdminWithI18n = translate("faq")(
  ({ t }: { t: TranslateFunction }) => (
    <NavLink to="/faqs" className="nav-link" activeClassName="active">
      <Icon type="customer-service" /> Faq
    </NavLink>
  )
);

const NavLinkWithI18n = translate("faq")(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/faq" className="nav-link" activeClassName="active">
    <Icon type="customer-service" /> Faq
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route
      exact
      path="/faq"
      component={loadable(() =>
        import("./containers/Faq").then((c) => c.default)
      )}
    />,
    <Route
      role={["admin"]}
      exact
      path="/faqs"
      component={loadable(() =>
        import("./containers/FaqsAdminPanel.web").then((c) => c.default)
      )}
    />,
    <Route
      role={["admin"]}
      exact
      path="/edit-faq/:id"
      component={loadable(() =>
        import("./containers/EditFaq.web").then((c) => c.default)
      )}
    />,
    <Route
      role={["admin"]}
      exact
      path="/add-faq"
      component={loadable(() =>
        import("./containers/AddFaq.web").then((c) => c.default)
      )}
    />,
  ],
  navItemAdmin: [
    <MenuItem key="/faqs">
      <NavLinkAdminWithI18n />
    </MenuItem>,
  ],
  navItem: [
    <MenuItem key="/faq">
      <NavLinkWithI18n />
    </MenuItem>,
  ],
  resolver: [resolvers],

  localization: [{ ns: "faq", resources }],
});
