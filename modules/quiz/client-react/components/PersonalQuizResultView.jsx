import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Collapse } from "antd";
import { PageLayout, Card } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
// import QuizForm from './QuizForm';
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";

const { Panel } = Collapse;

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${"Quiz-Result"}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${"Personal"}` },
    ]}
  />
);

export const ResultComponent = (props) => {
  const queAnsArray = [];

  props.quiz &&
    props.quiz.sections &&
    props.quiz.sections.map((sect) => {
      var dependencyExists = sect.questions.find(
        (qu) => qu.choiceType === QuestionTypes.DEPENDENCE
      );
      sect.questions.map((question, key) => {
        const getAnswers = () => {
          if (
            question.choiceType === QuestionTypes.TEXTAREA ||
            question.choiceType === QuestionTypes.TEXTBOX ||
            question.choiceType === QuestionTypes.SLIDER
          ) {
            return question.answers && question.answers[0].content;
          } else {
            let choiceIdArray = [];
            question.answers &&
              question.answers.forEach((answer) => {
                choiceIdArray.push(answer.choiceId);
              });
            const choice =
              question.choices &&
              question.choices.filter((c) => choiceIdArray.includes(c.id));
            const choiceLength = choice.length;
            return choice.map(
              (ch, i) =>
                `${ch.description}${
                  choiceLength > 1 && choiceLength > i + 1 ? ", " : ""
                }`
            );
          }
        };
        console.log("get annnnnn", getAnswers());
        if (dependencyExists) {
          if (
            question &&
            question.answers &&
            (question.answers[0].content !== "" ||
              question.answers[0].choiceId !== null)
          ) {
            queAnsArray.push({
              question: question && question.description,
              answer: getAnswers(),
            });
          }
        } else {
          queAnsArray.push({
            question: question && question.description,
            answer: getAnswers(),
          });
        }
      });
    });
  console.log("qans", queAnsArray);
  return (
    <>
      <h3>Result:</h3>
      <br />
      <Collapse>
        {queAnsArray.map((qan, key) => (
          <Panel header={qan.question} key={key}>
            <p>{qan.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

const PersonalQuizResultView = (props) => {
  return (
    <PageLayout type="forms">
      {renderMetaData(props.t)}
      {props.quizLoading || props.currentUserLoading || props.answersLoading ? (
        <div style={{ marginTop: "10vh" }} align="center">
          <Loader />
        </div>
      ) : (
        <Card
          style={{ maxWidth: "500px", margin: "auto" }}
          title={<h1>{props.quiz && props.quiz.title}</h1>}
        >
          <ResultComponent {...props} />
        </Card>
      )}
    </PageLayout>
  );
};

export default PersonalQuizResultView;
