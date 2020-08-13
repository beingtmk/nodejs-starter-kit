import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Row, Col, Card, Empty } from "antd";
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
  const { quizzes, loadingQuizzes } = props;

  const getQuestionCount = (sections) => {
    let qCount = 0;
    sections.map((section) => {
      qCount = qCount + (section.questions && section.questions.length);
    });
    return qCount;
  };
  console.log(quizzes);
  return (
    <PageLayout>
      <Row gutter={24}>
        {loadingQuizzes && (
          <div align="center">
            <Loader />
          </div>
        )}
        {!loadingQuizzes &&
          (quizzes && quizzes.length !== 0 ? (
            quizzes.map((quiz, key) => (
              <a href={`/quiz/${quiz.id}`}>
                <Col xs={24} md={12} lg={8}>
                  <Card
                    title={<h3>{quiz.title}</h3>}
                    cover={
                      <div align='center' style={{ height: "200px", overflow:'hidden' }}>
                        <img src={quiz.cover} height="100%" alt="" />
                      </div>
                    }
                  >
                    <h4>{quiz.description}</h4>
                  </Card>
                </Col>
              </a>
            ))
          ) : (
            <Empty description="No quizzes to show" />
          ))}
      </Row>
    </PageLayout>
  );
};

export default QuizzesCatalogueView;
