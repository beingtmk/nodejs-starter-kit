import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Badge } from "antd";
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

const QuizCountComponent = (props) => {
  const questions = props.quiz && props.quiz.questions;
  console.log(questions);
  return (
    <>
      {questions.length !== 0 &&
        questions.map((item, key) => (
          <> 
            <h2>{`${key + 1} - ${item.description}`}</h2>
            {item.choices &&
              item.choices.length !== 0 &&
              item.choices.map((choice, key) => (
                <div style={{marginLeft:'40px'}}>
                  <h3 style={{display:'inline'}}>{`${choice.description} -`}</h3><Badge showZero count={choice.count} />
                  <br/>
                </div>
              ))}
          <br/>
          <br/>
          </>
        ))}
    
    </>
  );
};

const QuizCountView = (props) => {
  return (
    <PageLayout type="forms">
      {renderMetaData(props.t)}
      {props.quizLoading || props.currentUserLoading ? (
        <div style={{ marginTop: "10vh" }} align="center">
          <Loader />
        </div>
      ) : (
        <Card
          style={{ maxWidth: "500px", margin: "auto" }}
          title={<h1>{props.quiz && props.quiz.title}</h1>}
        >
          <QuizCountComponent {...props} />
        </Card>
      )}
    </PageLayout>
  );
};

export default QuizCountView;
