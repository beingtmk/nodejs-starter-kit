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
import {
  PageLayout,
  MetaTags,
  CatalogueWithInfiniteScroll,
} from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
import QuizCatalogueComponent from "./QuizCatalogueComponent";
import QuizzesFilterComponent from "./QuizzesFilterComponent";

const { Title, Text } = Typography;
const { Meta } = Card;

const QuizzesCatalogueView = (props) => {
  const { quizList, loading, loadDataQuizList } = props;

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
      <Title level={1}>Quizzes</Title>
      <QuizzesFilterComponent {...props} />
      <br/>
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
      </Row>
      {!loading &&
        (quizList && quizList.edges && quizList.edges.length !== 0 ? (
          <CatalogueWithInfiniteScroll
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            component={QuizCatalogueComponent}
            endMessage={"End Of Quizzes"}
            loadData={props.loadDataQuizList}
            list={quizList}
            loading={loading}
            hasMore={quizList.pageInfo.hasNextPage}
            endCursor={quizList.pageInfo.endCursor}
            totalCount={quizList.totalCount}
          />
        ) : (
          <Empty description="No quizzes to show" />
        ))}
    </PageLayout>
  );
};

export default QuizzesCatalogueView;
