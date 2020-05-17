import React from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
// import PersonalQuizResultView from '../components/PersonalQuizResultView';
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message, Modal, Button, Spin as Loader } from "antd";
import QuizUserWiseReport from '../containers/QuizUserWiseReport';
// import USER_WISE_RESULT_QUERY from "../graphql/UserWiseResultQuery.graphql";

//To Do - Query after state.visible is true

const QuizUserWiseReportComponent = (quiz) => {
  console.log('quizzz', quiz);
  const resultQuiz = quiz.quiz;
  return(
  <h1>{resultQuiz.id}</h1>
  );
}
class QuizUserWiseReportModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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
            title="User-Wise Report"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <QuizUserWiseReport quizId={this.props.quizId} QuizUserWiseReportComponent={QuizUserWiseReportComponent}/>

            {/* {this.props.quizzLoading || this.props.answersLoading ? <Loader /> :(<ResultComponent {...this.props} />)} */}
          </Modal>
       
      </div>
    );
  }
}

export default ((QuizUserWiseReportModal));
