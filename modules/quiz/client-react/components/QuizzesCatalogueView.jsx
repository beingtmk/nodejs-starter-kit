import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Row, Col, Card } from "antd";
import { PageLayout } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
import QuizForm from "./QuizForm";

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

const QuizzesCatalogueView = (props) => {
  const { quizzes } = props;

  return (
    <div style={{ width: "100%" }}>
      {quizzes.length === 0 && "No Quizzes To Show"}
      <Row gutter={24}>
        <br />
        {quizzes.map((quiz, key) => (
          <a href={`/quiz/${quiz.id}`}>
          <Col xs={24} md={12} lg={8}>
            <Card title={<h3>{quiz.title}</h3>}>
              {console.log(quizzes[0])}
              <h4>{quiz.description}</h4>
              <h5>{`Question Count: ${quiz.questions && quiz.questions.length}`}</h5>

            </Card>
          </Col></a>
        ))}
      </Row>
    </div>
  );
};

export default QuizzesCatalogueView;
