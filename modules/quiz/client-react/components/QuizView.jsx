import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader } from "antd";
import { PageLayout, Card } from "@gqlapp/look-client-react";
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

const QuizView = (props) => {
  if(!props.currentUserLoading && !props.currentUser){
    props.history.push('/login');
  }
  return (
    <PageLayout type="forms" footerType={'small'} noNavbar={true}>
      {renderMetaData(props.t)}
      {props.quizLoading || props.currentUserLoading ? (
        <div style={{ marginTop: "10vh" }} align="center">
          <Loader />
        </div>
      ) : (
        <div style={{maxWidth:'800px', margin:'0 auto 60px', }}>
          {props.quiz ? (<QuizForm {...props} />): <h4>Quiz doesn't exists</h4>}
        </div>
      )}
    </PageLayout>
  );
};

export default QuizView;
