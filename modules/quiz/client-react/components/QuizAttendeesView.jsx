import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Card, Row, Col, Divider } from "antd";
import { PageLayout } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
// import QuizForm from "./QuizForm";
import QuizReport from "../containers/QuizReport";

const { Meta } = Card;
const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

const QuizAttendeesView = (props) => {
  let id = 0;
  if (props.match) {
    id = props.match.params.id;
  } else if (props.navigation) {
    id = props.navigation.state.params.id;
  }
  return (
    <PageLayout type="forms">
      {renderMetaData(props.t)}
      {props.quizLoading ? (
        <div style={{ marginTop: "10vh" }} align="center">
          <Loader />
        </div>
      ) : (
        <Card
          style={{ maxWidth: "500px", margin: "auto" }}
          title={<h1>Attendees</h1>}
        >
          {props.attempts && props.attempts.attempts && props.attempts.attempts.length === 0 ? (
            <h4>No Attempts</h4>
          ) : (
            props.attempts && props.attempts.attempts && props.attempts.attempts.map((item, key) => (
              <Row>
                <Col span={12}>
                  <h4 style={{ display: "inline" }}>
                    {item && item.user && item.user.username}
                  </h4>
                </Col>
                <Col span={12} align='right'>
                  <QuizReport
                    quizId={id}
                    userId={item && item.user && item.user.id}
                  />
                </Col>
                <Divider />
              </Row>
            ))
          )}
        </Card>
      )}
    </PageLayout>
  );
};

export default QuizAttendeesView;
