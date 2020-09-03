import React, {useEffect} from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import QuizView from '../components/QuizView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';

// import CONTACT from '../graphql/Quiz.graphql';
// import { QuizForm } from '../types';
import ADD_ATTEMPT from '../graphql/AddAttempt.graphql';
import QUIZ_WITH_RESULT_QUERY from '../graphql/QuizWithResultQuery.graphql';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import QUIZ_WITH_ANSWERS_SUBSCRIPTION from '../graphql/QuizWithAnswersSubscription.graphql';

const subscribeToQuizPage = (subscribeToMore, quizId, history, navigation) =>
  subscribeToMore({
    document: QUIZ_WITH_ANSWERS_SUBSCRIPTION,
    variables: { id: quizId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            quizWithAnswersUpdated: { mutation, node }
          }
        }
      }
    ) => {
      if (mutation === 'UPDATED') {
        return {quizWithAnswers:node}
      }
      return prev;
    }
  });


const Quiz = (props) => {


  useEffect(() => {
    if (props.quiz) {
      const {
        subscribeToMore,
        quiz: { id },
        history,
        navigation
      } = props;
      const subscribe = subscribeToQuizPage(subscribeToMore, id, history, navigation);
      return () => subscribe();
    }
  });


  const onSubmit =  async (values) => {
    const { t, addAttempt, quiz, quizLoading, history } = props; 
    try {
      await addAttempt(values);
      message.destroy();
          message.success('Attempt Submitted');
          history.push(`/quiz/result/${quiz.id}`);
    } catch (e) {
      message.destroy();
          message.error("Couldn't perform the action");
      throw new FormError(t('serverError'), e);
    }
  };
  
  return (
    
    <QuizView {...props} onSubmit={onSubmit} />
    );
  };
  // <h1>quiz</h1>

export default compose(
  graphql(ADD_ATTEMPT, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addAttempt: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let ansData = await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addAttempt: {
                __typename: 'AttemptInput',
                ...values
              }
            }
          });

          
        } catch (e) {
          
          console.error(e);
        }
      }
    })
  }),
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
    props({ data: { loading, error, quizWithAnswers, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { quizLoading: loading, quiz:quizWithAnswers, subscribeToMore, updateQuery };
    }
  })
  )(translate('quiz')(Quiz));
