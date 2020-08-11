import React from "react";

import ClientModule from "@gqlapp/module-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import loadable from "@loadable/component";
import {Icon} from 'antd';
import { Route, NavLink } from "react-router-dom";
import { MenuItem } from "@gqlapp/look-client-react";
import resources from "./locales";

const NavLinkQuizListWithI18n = translate("quiz")(
  ({ t }: { t: TranslateFunction }) => (
    <NavLink to="/quiz-list" className="nav-link" activeClassName="active">
     Quiz
    </NavLink>
  )
);

const NavLinkQuizCatalogueWithI18n = translate("quiz")(
  ({ t }: { t: TranslateFunction }) => (
    <NavLink to="/quiz-catalogue" className="nav-link" activeClassName="active">
      <Icon type="question-circle" /> {" "}Quiz{" "}
    </NavLink>
  )
);

export default new ClientModule({
  route: [
    <Route
      exact
      path="/quiz/:id"
      component={loadable(() =>
        import("./containers/Quiz").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/quiz/count/:id"
      component={loadable(() =>
        import("./containers/QuizCount").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/quiz/result/:id"
      component={loadable(() =>
        import("./containers/PersonalQuizResult").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/quiz-add"
      component={loadable(() =>
        import("./containers/QuizAdd").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/quiz/edit/:id"
      component={loadable(() =>
        import("./containers/QuizEdit").then((c) => c.default)
      )}
    />,
    <Route
    exact
    role={['user', 'admin']}
    redirect="/login"
    path="/quiz/report/:id"
    component={loadable(() =>
      import("./containers/QuizUserWiseReportPage").then((c) => c.default)
    )}
  />,
    <Route
      exact
      path="/quiz-list"
      role={['user', 'admin']}
      redirect="/login"
      component={loadable(() =>
        import("./containers/Quizzes.web").then((c) => c.default)
      )}
    />,
    <Route
      exact
      path="/quiz-catalogue"
      component={loadable(() =>
        import("./containers/QuizzesPublic.web").then((c) => c.default)
      )}
    />,
    <Route
    role={['user', 'admin']}
    redirect="/login"
      exact
      path="/quiz/attendees/:id"
      component={loadable(() =>
        import("./containers/QuizAttendees").then((c) => c.default)
      )}
    />,
  ],
  navItemAdmin: [
    <MenuItem key="/quiz-list">
      <NavLinkQuizListWithI18n />
    </MenuItem>,
  ],
  navItem: [
    <MenuItem key="/quiz-catalogue">
      <NavLinkQuizCatalogueWithI18n />
    </MenuItem>,
  ],
  localization: [{ ns: "quiz", resources }],
});
