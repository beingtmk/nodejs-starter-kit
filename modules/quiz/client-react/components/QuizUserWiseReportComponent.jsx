import React from "react";
import { graphql } from "react-apollo";
import { message, Modal, Button, Spin as Loader } from "antd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { compose } from "@gqlapp/core-common";
import { Table } from "@gqlapp/look-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import QuizUserWiseReport from "../containers/QuizUserWiseReport";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
import { countries } from "@gqlapp/quiz-common/constants/CountriesList";
import IndividualQuizReport from "./IndividualQuizReport";
import { getResult } from "../helpers";

const GraphChartComponent = (props) => {
  console.log("chart component", props);

  const { graphQuestion } = props;
  const getCount = (ans, currentChoice) => {
    var choiceAnswers = ans.filter((an) => an.choiceId === currentChoice.id);
    return choiceAnswers && choiceAnswers.length;
  };

  var graphData = [];
  if (graphQuestion && graphQuestion.choiceType === QuestionTypes.COUNTRIES) {
    countries.map((cou) => {
      graphData.push({
        name: cou,
        amt:
          graphQuestion.answers &&
          graphQuestion.answers.filter((ann) => ann.content === cou).length,
      });
    });
  } else if (graphQuestion) {
    graphQuestion.choices &&
      graphQuestion.choices.map((choi) => {
        graphData.push({
          name: choi.description,
          amt: getCount(graphQuestion.answers, choi),
        });
      });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      console.log("customTooltip", payload[0]);
      const totalAnswersCount = graphQuestion && graphQuestion.answers.length;
      const amount = payload && payload[0].payload && payload[0].payload.amt;
      return (
        <div style={{ background: "white", padding: "24px" }}>
          <p className="label">{`${label} : ${amount}`}</p>
          <p className="desc">
            {((amount * 100) / totalAnswersCount).toFixed(2)}%
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <BarChart
      width={1000}
      height={300}
      data={graphData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="amt" fill="#97C240" />
    </BarChart>
  );
};

//To Do - Query after state.visible is true

export const QuizUserWiseReportComponent = (props) => {
  const [graphQuestion, seTGraphQuestion] = React.useState(null);

  console.log("quizuserwisereportcomponent", props);
  const resultQuiz = props.quiz;
  var questionsData = [];
  resultQuiz &&
    resultQuiz.sections &&
    resultQuiz.sections.map((sec) => {
      questionsData = [...questionsData, ...sec.questions];
    });
  const data = questionsData;

  var columns = [
    {
      title: "Users",
      dataIndex: "user",
      key: "user",
      fixed: "left",
      width: 200,
      render: (text, record) => <p> {record.id} </p>,
    },
  ];

  // var columns = [
  //   {
  //     title: "Question",
  //     dataIndex: "question",
  //     key: "question",
  //     fixed: "left",
  //     width: "150",
  //     render: (text, record) => <p> {record.description} </p>,
  //   },
  // ];

  if (props.userFId) {
    const currentAttempt =
      resultQuiz &&
      resultQuiz.attempts &&
      resultQuiz.attempts.find((attem) => attem.userId === props.userFId);

    return (
      <IndividualQuizReport
        currentAttempt={currentAttempt}
        questionsData={questionsData}
      />
    );
  }

  questionsData &&
    questionsData.map((que, i) => {
      columns.push({
        width: 150,
        title: (
          <a onClick={(e) => handleColumnClick(que)}>
            {que && que.description}
          </a>
        ),
        dataIndex: `question.description`,
        key: `question.description-${i}`,
        render: (text, record) => <>{getResult(que, record)}</>,
      });
    });

  // resultQuiz &&
  //   resultQuiz.attempts &&
  //   resultQuiz.attempts.map((attem) => {
  //     columns.push({
  //       width: 100,
  //       title: attem && attem.user && attem.user.username,
  //       dataIndex: attem && attem.user && attem.user.username,
  //       key: attem && attem.user && attem.user.username,
  //       render: (text, record) => <a>{getResult(record, attem)}</a>,
  //     });
  //   });

  const handleColumnClick = (ques) => {
    // console.log('handleColumnClick', ques);
    var currentQ = questionsData.find((qu) => qu.id === ques.id);
    var answersArray = [];
    resultQuiz &&
      resultQuiz.attempts &&
      resultQuiz.attempts.map((attem, key) => {
        answersArray = [
          ...answersArray,
          ...(attem &&
            attem.answers.filter((ans) => ans.questionId === currentQ.id)),
        ];
      });
    currentQ.answers = answersArray;
    console.log("currentQ", currentQ);
    seTGraphQuestion(currentQ);
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {graphQuestion &&
        (graphQuestion.choiceType === QuestionTypes.RADIO ||
          graphQuestion.choiceType === QuestionTypes.SELECT ||
          graphQuestion.choiceType === QuestionTypes.MSELECT ||
          graphQuestion.choiceType === QuestionTypes.CHECKBOX ||
          graphQuestion.choiceType === QuestionTypes.COUNTRIES) && (
          <div align="center">
            <GraphChartComponent graphQuestion={graphQuestion} />
          </div>
        )}

      <Table
        columns={columns}
        dataSource={resultQuiz && resultQuiz.attempts}
        scroll={{ x: 100 * (columns && columns.length), y: 700 }}
      />
    </div>
  );
};

export default QuizUserWiseReportComponent;
