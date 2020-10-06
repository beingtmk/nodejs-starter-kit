import React from "react";
import { Icon } from "antd";
import ClientModule from "@gqlapp/module-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import loadable from "@loadable/component";

import { Route, NavLink } from "react-router-dom";
import { MenuItem, PageLoading } from "@gqlapp/look-client-react";
import resources from "./locales";
import resolvers from "./resolvers";

const NavLinkAdminWithI18n = translate("faq")(
  ({ t }: { t: TranslateFunction }) => (
    <NavLink to="/faqs" className="nav-link" activeClassName="active">
      <Icon type="customer-service" /> FAQ
    </NavLink>
  )
);

const NavLinkWithI18n = translate("faq")(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/faq" className="nav-link" activeClassName="active">
    <Icon type="customer-service" /> FAQ
  </NavLink>
));

const LoadableFaqCatalogue = loadable(() => import("./containers/Faq"), {
  fallback: <PageLoading />,
});

const LoadableFaqAdmin = loadable(
  () => import("./containers/FaqsAdminPanel.web"),
  {
    fallback: <PageLoading />,
  }
);

const LoadableFaqEdit = loadable(() => import("./containers/EditFaq.web"), {
  fallback: <PageLoading />,
});

const LoadableFaqAdd = loadable(() => import("./containers/AddFaq.web"), {
  fallback: <PageLoading />,
});

export default new ClientModule({
  route: [
    <Route exact path="/faq" component={LoadableFaqCatalogue} />,
    <Route role={["admin"]} exact path="/faqs" component={LoadableFaqAdmin} />,
    <Route
      role={["admin"]}
      exact
      path="/edit-faq/:id"
      component={LoadableFaqEdit}
    />,
    <Route role={["admin"]} exact path="/add-faq" component={LoadableFaqAdd} />,
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
