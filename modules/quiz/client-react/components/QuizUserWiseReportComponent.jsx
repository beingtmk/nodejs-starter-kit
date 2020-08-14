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

const ChartComponent = (props) => {
  console.log("chart component", props);

  const { currentRow } = props;
  if (
    !currentRow ||
    (currentRow && !currentRow.choices) ||
    (currentRow && currentRow.choices && currentRow.choices.length === 0)
  ) {
    return <h4>Graphical Representation doesn't exist</h4>;
  };

  const getCount=(ans, currentChoice)=>{
    var choiceAnswers = ans.filter(an=>an.choiceId === currentChoice.id);
    return choiceAnswers && choiceAnswers.length;
  }

  var graphData = [];
  currentRow && currentRow.choices && currentRow.choices.map(choi=>{
    graphData.push({
      name:choi.description,
      amt:getCount(currentRow.answers, choi),
    })
  })
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
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

  const getResult = (record, attempt) => {
    if (
      record.choiceType === QuestionTypes.TEXTBOX ||
      record.choiceType === QuestionTypes.TEXTAREA ||
      record.choiceType === QuestionTypes.SLIDER ||
      record.choiceType === QuestionTypes.COUNTRIES
    ) {
      const result =
        attempt.answers &&
        attempt.answers.find((anS) => anS.questionId === record.id);
      // record &&
      // record.answers &&
      // record.answers.length !== 0 &&
      // record.answers.find((res) => res.userId === id);
      // console.log('result', result);
      return result && result.content;
    } else {
      const result =
        attempt.answers &&
        attempt.answers.filter((res) => res.questionId === record.id);
      let choiceIdArray = [];

      result.forEach((answer) => {
        choiceIdArray.push(answer.choiceId);
      });
      const choice = record.choices.filter((c) => choiceIdArray.includes(c.id));
      const choiceLength = choice.length;

      return choice.map(
        (ch, i) =>
          `${ch.description}${
            choiceLength > 1 && choiceLength > i + 1 ? ", " : ""
          }`
      );
    }
  };
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

  resultQuiz &&
    resultQuiz.attempts &&
    resultQuiz.attempts.map((attem) => {
      if (!props.userFId) {
        columns.push({
          width: 100,
          title: attem && attem.user && attem.user.username,
          dataIndex: attem && attem.user && attem.user.username,
          key: attem && attem.user && attem.user.username,
          render: (text, record) => <a>{getResult(record, attem)}</a>,
        });
      } else {
        if (attem.userId === props.userFId) {
          columns.push({
            width: 100,
            title: attem && attem.user && attem.user.username,
            dataIndex: attem && attem.user && attem.user.username,
            key: attem && attem.user && attem.user.username,
            render: (text, record) => <a>{getResult(record, attem)}</a>,
          });
        }
      }
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
            onClick: (event) => handleRowClick(record, event), // click row
            // onDoubleClick: event => {}, // double click row
            // onContextMenu: event => {}, // right button click row
            // onMouseEnter: event => {}, // mouse enter row
            // onMouseLeave: event => {}, // mouse leave row
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
