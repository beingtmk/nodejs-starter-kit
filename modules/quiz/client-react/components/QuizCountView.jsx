import React from "react";
import Helmet from "react-helmet";
import { Spin as Loader, Badge, Tree } from "antd";
import { PageLayout, Card } from "@gqlapp/look-client-react";
import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
// import QuizForm from "./QuizForm";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";

const { TreeNode } = Tree;

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

const QuizCountComponent = (props) => {
  const sections = props.quiz && props.quiz.sections;
  console.log("countries", props.quiz.sections[0].questions[2].choices);
  return (
    <>
      {sections &&
        sections.map((section) => (
          <div style={{ marginBottom: "30px" }}>
            <h3>{section.title}</h3>
            <hr />
            {section &&
              section.questions &&
              section.questions.map((question) => (
                <div style={{ marginBottom: "10px" }}>
                  <h4>{question.description}</h4>
                  {question &&
                    question.choiceType &&
                    question.choiceType !== QuestionTypes.SLIDER &&
                    ((question.choiceType === QuestionTypes.COUNTRIES && (
                      <Tree>
                        <TreeNode key="0" title="countries">
                          {question.countries &&
                            question.countries.map((couN) => (
                              <>
                                <TreeNode
                                  key={couN.description}
                                  title={
                                    <>
                                      <h5 style={{ display: "inline" }}>
                                        {couN.description} -
                                      </h5>
                                      <Badge showZero count={couN.count} />
                                    </>
                                  }
                                />
                              </>
                            ))}
                        </TreeNode>
                      </Tree>
                    )) ||
                      (question.choices &&
                        question.choices.map((choice) => (
                          <div>
                            <h5 style={{ display: "inline" }}>
                              {choice.description} -
                            </h5>
                            <Badge showZero count={choice.count} />
                          </div>
                        ))))}
                </div>
              ))}
          </div>
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
