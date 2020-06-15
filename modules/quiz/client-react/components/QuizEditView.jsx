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
    <Card style={{maxWidth:'500px', margin:'auto'}}>
      <CardTitle>
        <Icon type="global" /> {'Edit Quiz'}
      </CardTitle>
      {props.quiz ?(<QuizAddForm {...props} />): "Quiz doesn't exist"}
    </Card>
  );
  return (
    <PageLayout type="forms">
      <Helmet
        title={`${settings.app.name} - ${'Quiz'}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${'Add'}`,
          },
        ]}
      />

      {renderContent()}
    </PageLayout>
  );
};

export default QuizAddView;
