import React from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { Table } from "@gqlapp/look-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
// import PersonalQuizResultView from '../components/PersonalQuizResultView';
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message, Modal, Button, Spin as Loader } from "antd";
import QuizUserWiseReport from "../containers/QuizUserWiseReport";
// import USER_WISE_RESULT_QUERY from "../graphql/UserWiseResultQuery.graphql";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";

//To Do - Query after state.visible is true

export const QuizUserWiseReportComponent = (quiz) => {
  const resultQuiz = quiz.quiz;
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
      attempt.answers && attempt.answers.find(anS=>anS.questionId === record.id);
        // record &&
        // record.answers &&
        // record.answers.length !== 0 &&
        // record.answers.find((res) => res.userId === id);
        // console.log('result', result);
      return result && result.content;
    } else {
      const result =
      attempt.answers && attempt.answers.filter((res) => res.questionId === record.id);
      let choiceIdArray = [];

      result.forEach((answer) => {
        choiceIdArray.push(answer.choiceId);
      });
      const choice = record.choices.filter((c) => choiceIdArray.includes(c.id));
      const choiceLength = choice.length;
      console.log('result', choice);

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
      render: (text, record) => <p> {record.description} </p>,
    },
  ];


  resultQuiz && resultQuiz.attempts && resultQuiz.attempts.map((attem)=>{
    columns.push({
      title: attem && attem.user && attem.user.username,
      dataIndex: attem && attem.user && attem.user.username,
      key: attem && attem.user && attem.user.username,
      render: (text, record) => <a>{getResult(record, attem)}</a>,
    });
  })

  // resultQuiz &&
  //   resultQuiz.attempts &&
  //   resultQuiz.attempts.users &&
  //   resultQuiz.attempts.users.length !== 0 &&
  //   resultQuiz.attempts.users.map((user, key) => {
  //     columns.push({
  //       title: user.username,
  //       dataIndex: user.username,
  //       key: user.username,
  //       render: (text, record) => <a>{getResult(record, user.id)}</a>,
  //     });
  //   });
    
    console.log('resultQuiz', columns);
    console.log('quizuserwisereportmodal', resultQuiz);
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
class QuizUserWiseReportModal extends React.Component {
  constructor(props) {
    super(props);
    // this.subscription = null;
    this.state = { visible: false, groupId: null };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // handleClose = (e) => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  setGroupId = (e) => {
    this.setState({
      groupId: e,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" size="small" onClick={this.showModal}>
          UserWiseReport
        </Button>

        <Modal
          className="quiz-result-modal"
          title={this.props.title}
          visible={this.state.visible}
          footer={null}
          onClose={this.handleClose}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <QuizUserWiseReport
            quizId={this.props.quizId}
            groupId={this.state.groupId}
            setGroupId={this.setGroupId}
            QuizUserWiseReportComponent={QuizUserWiseReportComponent}
          />

          {/* {this.props.quizzLoading || this.props.answersLoading ? <Loader /> :(<ResultComponent {...this.props} />)} */}
        </Modal>
      </div>
    );
  }
}

export default QuizUserWiseReportModal;
