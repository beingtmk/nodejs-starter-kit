import React from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
// import PersonalQuizResultView from '../components/PersonalQuizResultView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message, Modal, Button, Spin as Loader } from 'antd';

// import CONTACT from '../graphql/Quiz.graphql';
// import { QuizForm } from '../types';
// import ADD_ANSWER from '../graphql/AddAnswers.graphql';
import QUIZ_QUERY from '../graphql/QuizQuery.graphql';
import ANSWERS_QUERY from '../graphql/AnswersQuery.graphql';
// import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import {ResultComponent} from '../components/PersonalQuizResultView'

class QuizReport extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          View Answers
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {console.log(this.props)}
          {this.props.quizzLoading || this.props.answersLoading ? <Loader /> :(<ResultComponent {...this.props} />)}
        </Modal>
      </div>
    );
  }
}
  
export default compose(
  graphql(QUIZ_QUERY, {
    options: props => {
      
      return {
        variables: { id: Number(props.quizId) }
      };
    },
    props({ data: { loading, error, quiz } }) {
      if (error) throw new Error(error);
      return { quizzLoading: loading, quiz };
    }
  }),
  graphql(ANSWERS_QUERY, {
    options: props => {
      return {
        variables: { quizId: Number(props.quizId), userId: Number(props.userId) }
      };
    },
    props({ data: { loading, error, answers } }) {
      if (error) throw new Error(error);
      return { answersLoading: loading, answers };
    }
  }),
  )(translate('quiz')(QuizReport));
