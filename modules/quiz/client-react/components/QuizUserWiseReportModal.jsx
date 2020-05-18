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

//To Do - Query after state.visible is true

const QuizUserWiseReportComponent = (quiz) => {
  const resultQuiz = quiz.quiz;
  const data = resultQuiz.questions;
  const getResult = (record, id) => {
    const result =
      record &&
      record.answers &&
      record.answers.length !== 0 &&
      record.answers.find((res) => res.userId === id);
    const choice =
      record &&
      record.choices &&
      record.choices.length !== 0 &&
      record.choices.find((cho) => result && result.choiceId === cho.id);
    return choice && choice.description;
  };
  var columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text, record) => <p> {record.description} </p>,
    },
  ];
  console.log(resultQuiz);
  resultQuiz &&
    resultQuiz.attendees &&
    resultQuiz.attendees.users &&
    resultQuiz.attendees.users.length !== 0 &&
    resultQuiz.attendees.users.map((user, key) => {
      columns.push({
        title: user.username,
        dataIndex: user.username,
        key: user.username,
        render: (text, record) => <a>{getResult(record, user.id)}</a>,
      });
    });
  return (
    <div style={{width:'100%', overflowX:'auto'}}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
class QuizUserWiseReportModal extends React.Component {
  state = { visible: false };

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
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" size="small" onClick={this.showModal}>
          UserWiseReport
        </Button>

        <Modal
        className='quiz-result-modal'
          title={this.props.title}
          visible={this.state.visible}
          footer={null}
          onClose={this.handleClose}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <QuizUserWiseReport
            quizId={this.props.quizId}
            QuizUserWiseReportComponent={QuizUserWiseReportComponent}
          />

          {/* {this.props.quizzLoading || this.props.answersLoading ? <Loader /> :(<ResultComponent {...this.props} />)} */}
        </Modal>
      </div>
    );
  }
}

export default QuizUserWiseReportModal;
