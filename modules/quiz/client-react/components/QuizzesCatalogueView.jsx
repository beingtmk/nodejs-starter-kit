import React from "react";
import Helmet from "react-helmet";
import {
  Spin as Loader,
  Row,
  Col,
  Card,
  Empty,
  Typography,
  Skeleton,
} from "antd";
import { PageLayout, MetaTags } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
import QuizCatalogueComponent from "./QuizCatalogueComponent";

const { Title, Text } = Typography;
const { Meta } = Card;

const QuizzesCatalogueView = (props) => {
  const { quizList, loading } = props;

  const getQuestionCount = (sections) => {
    let qCount = 0;
    sections.map((section) => {
      qCount = qCount + (section.questions && section.questions.length);
    });
    return qCount;
  };
  return (
    <PageLayout>
      <MetaTags title="All Quizzes" description="Take Quizzes" />
      <Row gutter={24}>
        {loading &&
          [...Array(3).keys()].map((key, key1) => (
            <Col xs={24} md={12} lg={8}>
              <Card
                cover={
                  <div
                    align="center"
                    style={{ overflow: "hidden", height: "200px" }}
                  >
                    <Skeleton
                      active={true}
                      avatar={{ shape: "square", size: 350 }}
                      paragraph={false}
                    />
                  </div>
                }
              >
                <Skeleton active={true} title={false} paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        {!loading &&
          (quizList && quizList.length !== 0 ? (
            quizList.edges &&
            quizList.edges.map((edge, key) => (
              <Col xs={24} md={12} lg={8} key={key}>
                <QuizCatalogueComponent node={edge.node} />
              </Col>
            ))
          ) : (
            <Empty description="No quizzes to show" />
          ))}
      </Row>
    </PageLayout>
  );
};

export default QuizzesCatalogueView;
