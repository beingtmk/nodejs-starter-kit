import React from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import QuizResultView from '../components/QuizResultView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';

// import CONTACT from '../graphql/Quiz.graphql';
// import { QuizForm } from '../types';
import ADD_ANSWER from '../graphql/AddAnswers.graphql';
import QUIZ_QUERY from '../graphql/QuizQuery.graphql';
import ANSWERS_QUERY from '../graphql/AnswersQuery.graphql';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';


const QuizResult = (props) => {
  // const onSubmit =  async (values) => {
  //   const { t, addAnswer, quiz, quizLoading } = props; 
  //   try {
  //     await addAnswer(values);
  //     message.destroy();
  //         message.success('Answers Submitted');
  //   } catch (e) {
  //     message.destroy();
  //         message.error("Couldn't perform the action");
  //     throw new FormError(t('serverError'), e);
  //   }
  // };
  console.log('quiz', props);
  return (
    
    <QuizResultView {...props} />
    );
  };
  
export default compose(

  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading:loading, currentUser };
    }
  }),
  graphql(QUIZ_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, quiz } }) {
      if (error) throw new Error(error);
      return { quizLoading: loading, quiz };
    }
  }),
  graphql(ANSWERS_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      const currentUserId = !props.currentUserLoading && props.currentUser && props.currentUser.id;
      console.log('query props', props, currentUserId);

      return {
        variables: { quizId: Number(id), userId: Number(currentUserId) }
      };
    },
    props({ data: { loading, error, answers } }) {
      if (error) throw new Error(error);
      return { answersLoading: loading, answers };
    }
  }),
  )(translate('contact')(QuizResult));
