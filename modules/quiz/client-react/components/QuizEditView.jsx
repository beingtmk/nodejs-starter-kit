import React from "react";
// import Grid from "hedron";
import Helmet from "react-helmet";

// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import {
  // LayoutCenter,
  PageLayout,
  Card,
  CardTitle,
  Icon,
} from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

import QuizAddForm from "./QuizAddForm";
// import { QuizAddForm as IQuizAddForm } from "../types";

const QuizAddView = (props) => {
  const { t } = props;
  const renderContent = () => (
    <div style={{ maxWidth: "800px", width: "100%", margin: "auto" }}>
      <Card style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "25px" }}>
          <Icon type="edit" /> Quiz Edit Form
        </h1>
      </Card>
      {props.quiz ? <QuizAddForm {...props} /> : "Quiz doesn't exist"}
    </div>
  );
  return (
    <PageLayout type="forms">
      <Helmet
        title={`${settings.app.name} - ${"Quiz"}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${"Add"}`,
          },
        ]}
      />

      {renderContent()}
    </PageLayout>
  );
};

export default QuizAddView;
