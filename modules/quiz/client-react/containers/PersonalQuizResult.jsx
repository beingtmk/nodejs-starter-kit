import React from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import PersonalQuizResultView from '../components/PersonalQuizResultView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';

// import CONTACT from '../graphql/Quiz.graphql';
// import { QuizForm } from '../types';
import QUIZ_WITH_RESULT_QUERY from '../graphql/QuizWithResultQuery.graphql';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';


const PersonalQuizResult = (props) => {
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
  props.refetch();
  console.log('personal quiz result', props);
  return (
    
    <PersonalQuizResultView {...props} />
    );
  };
  
export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading:loading, currentUser };
    }
  }),
  graphql(QUIZ_WITH_RESULT_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      const currentUserId = !props.currentUserLoading && props.currentUser && props.currentUser.id;

      return {
        variables: { id: Number(id), userId: Number(currentUserId) }
      };
    },
    props({ data: { loading, error, quizWithAnswers, refetch } }) {
      if (error) throw new Error(error);
      return { quizLoading: loading, quiz:quizWithAnswers, refetch };
    }
  })
  )(translate('contact')(PersonalQuizResult));
