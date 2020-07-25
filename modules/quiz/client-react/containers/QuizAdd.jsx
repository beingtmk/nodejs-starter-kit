import React from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import QuizAddView from '../components/QuizAddView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';
import { CurrentUserWrapper } from '@gqlapp/user-client-react';
// import CONTACT from '../graphql/QuizAdd.graphql';
// import { QuizAddForm } from '../types';
import QUIZ_EDIT from '../graphql/QuizEdit.graphql';
import ADD_QUIZ_QUERY from '../graphql/AddQuizQuery.graphql';


const QuizAddContainer = (props) => {
  const onSubmit = async (values) => {
    const { t, addQuiz, currentUserLoading, currentUser, history } = props;
    const userId = !currentUserLoading && currentUser && currentUser.id;
    values.userId = userId;
    try {
      const newQ = await editQuiz(values);
      console.log('newww', newQ);
      history.push(`/quiz/${newQ.data.addQuiz.id}`)
    } catch (e) {
      throw new FormError(t('serverError'), e);
    }
  };


  console.log('quiz add form', props);
  return (

    <QuizAddView {...props} onSubmit={onSubmit} />

  );
};

const QuizAddWithoutCurrentUser = compose(
  graphql(ADD_QUIZ_QUERY, {
    options: props => {
      const currentUserId = !props.currentUserLoading && props.currentUser && props.currentUser.id;

      return {
        variables: { userId: Number(currentUserId) }
      };
    },
    props({ data: { loading, error, quiz, refetch } }) {
      if (error) throw new Error(error);
      return { quizLoading: loading, quiz, refetch };
    }
  }),
  graphql(QUIZ_EDIT, {
    props: ({ ownProps: { history, navigation, refetch }, mutate }) => ({
      editQuiz: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let quizData = await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              editQuiz: {
                __typename: 'Quiz',
                ...values
              }
            }
          });
          refetch();
          message.destroy();
          message.success('Quiz edited.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
)(translate('contact')(QuizAddContainer));


const QuizAdd = (props) => {
  return (
    <CurrentUserWrapper>
      <QuizAddWithoutCurrentUser {...props} />
    </CurrentUserWrapper>
  )
}

export default QuizAdd;