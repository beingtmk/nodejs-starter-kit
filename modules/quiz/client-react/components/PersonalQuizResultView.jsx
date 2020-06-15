import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Collapse } from "antd";
import { PageLayout, Card } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
// import QuizForm from './QuizForm';
import QuestionTypes from '@gqlapp/quiz-common/constants/QuestionTypes';


const { Panel } = Collapse;

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

export const ResultComponent = (props) => {
  const queAnsArray = [];
  const answers = props.answers;

  answers.answers.map((answer, key) => {
    const question = props.quiz.questions.find(
      (q) => q.id === answer.questionId
    );
    const getAnswers = () =>{
      if(question.choiceType === QuestionTypes.TEXTAREA || question.choiceType === QuestionTypes.TEXTBOX){
        return answer.content;
      }else if(question.choiceType === QuestionTypes.SELECT || question.choiceType === QuestionTypes.RADIO || question.choiceType === QuestionTypes.MSELECT){
        const choice = question.choices.filter((c) => c.id === answer.choiceId);
        return `${choice.map(ch=> ch.description)}`
      }
    }
    console.log('get annnnnn', getAnswers());
    queAnsArray.push({
      question: question && question.description,
      answer: getAnswers(),
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
