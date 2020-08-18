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
import QUIZ_WITH_RESULT_QUERY from '../graphql/QuizWithResultQuery.graphql';
import ANSWERS_QUERY from '../graphql/AnswersQuery.graphql';
// import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import {ResultComponent} from '../components/PersonalQuizResultView'

class QuizReport extends React.Component {


  render() {
    console.log('quizreportrender', this.props);
    return (
      <div>
          {this.props.quizzLoading ? <Loader /> :(this.props.quiz ? (<ResultComponent {...this.props} />): 'No result queried')}
      </div>
    );
  }
}
  
export default compose(
  graphql(QUIZ_WITH_RESULT_QUERY, {
    options: props => {
      return {
        variables: { id: Number(props.quizId), userId: Number(props.userId) }
      };
    },
    props({ data: { loading, error, quizWithAnswers } }) {
      if (error) throw new Error(error);
      return { quizzLoading: loading, quiz:quizWithAnswers };
    }
  })
  )(translate('quiz')(QuizReport));
