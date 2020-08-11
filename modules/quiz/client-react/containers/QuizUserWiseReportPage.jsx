import React from "react";
import { Table } from "@gqlapp/look-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import {PageLayout} from '@gqlapp/look-client-react';
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message, Modal, Button, Spin as Loader } from "antd";
import QuizUserWiseReport from "./QuizUserWiseReport";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
import QuizUserWiseReportComponent from '../components/QuizUserWiseReportComponent';
//To Do - Query after state.visible is true

class QuizUserWiseReportPage extends React.Component {
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
    const {match, navigation} = this.props;
    return (
      <PageLayout>
        
          <QuizUserWiseReport
            quizId={this.props.quizId}
            groupId={this.state.groupId}
            setGroupId={this.setGroupId}
            match={match}
            navigation={navigation}
            QuizUserWiseReportComponent={QuizUserWiseReportComponent}
          />

          {/* {this.props.quizzLoading || this.props.answersLoading ? <Loader /> :(<ResultComponent {...this.props} />)} */}
      </PageLayout>
    );
  }
}

export default QuizUserWiseReportPage;
