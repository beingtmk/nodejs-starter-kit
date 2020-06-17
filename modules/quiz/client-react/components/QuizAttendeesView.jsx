import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader } from "antd";
import { PageLayout, Card } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
// import QuizForm from "./QuizForm";
import QuizReport from "../containers/QuizReport";
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
          {props.users.users.length === 0 ? (
            <h4>No Attempts</h4>
          ) : (
            props.users.users.map((item, key) => (
              <>
                <h4 style={{ display: "inline" }}>{item.username}</h4>
                <QuizReport quizId={id} userId={item.id} />
                <br />
              </>
            ))
          )}
        </Card>
      )}
    </PageLayout>
  );
};

export default QuizAttendeesView;
