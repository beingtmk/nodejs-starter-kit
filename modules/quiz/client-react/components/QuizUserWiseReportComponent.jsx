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
import IndividualQuizReport from "./IndividualQuizReport";
import {getResult} from '../helpers';


const ChartComponent = (props) => {
  console.log("chart component", props);

  const { currentRow } = props;
  if (
    !currentRow ||
    (currentRow && !currentRow.choices) ||
    (currentRow && currentRow.choices && currentRow.choices.length === 0)
  ) {
    return <h4>Graphical Representation doesn't exist</h4>;
  }

  const getCount = (ans, currentChoice) => {
    var choiceAnswers = ans.filter((an) => an.choiceId === currentChoice.id);
    return choiceAnswers && choiceAnswers.length;
  };

  var graphData = [];
  currentRow &&
    currentRow.choices &&
    currentRow.choices.map((choi) => {
      graphData.push({
        name: choi.description,
        amt: getCount(currentRow.answers, choi),
      });
    });
  return (
    <BarChart
      width={800}
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
      <Tooltip />
      <Legend />
      <Bar dataKey="amt" fill="#97C240" />
    </BarChart>
  );
};

//To Do - Query after state.visible is true

export const QuizUserWiseReportComponent = (props) => {
  const [currentRow, seTCurrentRow] = React.useState(null);

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
      title: "Question",
      dataIndex: "question",
      key: "question",
      fixed: "left",
      width: "150",
      render: (text, record) => <p> {record.description} </p>,
    },
  ];

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

  resultQuiz &&
    resultQuiz.attempts &&
    resultQuiz.attempts.map((attem) => {
      columns.push({
        width: 100,
        title: attem && attem.user && attem.user.username,
        dataIndex: attem && attem.user && attem.user.username,
        key: attem && attem.user && attem.user.username,
        render: (text, record) => <a>{getResult(record, attem)}</a>,
      });
    });

  const handleRowClick = (record, event) => {
    seTCurrentRow(record);
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {currentRow && (
        <div align="center">
          <ChartComponent currentRow={currentRow} />
        </div>
      )}
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => handleRowClick(record, event),
          };
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 100 * (columns && columns.length), y: 700 }}
      />
    </div>
  );
};

export default QuizUserWiseReportComponent;
