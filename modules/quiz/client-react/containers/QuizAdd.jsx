import React from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import QuizAddView from '../components/QuizAddView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

// import CONTACT from '../graphql/QuizAdd.graphql';
// import { QuizAddForm } from '../types';
import QUIZ_ADD from '../graphql/QuizAdd.graphql';


const QuizAdd = (props) => {
  const onSubmit =  async (values) => {
    const { t, addQuiz, currentUserLoading, currentUser } = props;
    const userId = !currentUserLoading && currentUser && currentUser.id;
    values.userId = userId;
    try {
      await addQuiz(values);
    } catch (e) {
      throw new FormError(t('serverError'), e);
    }
  };

  return (
    
     <QuizAddView {...props} onSubmit={onSubmit} />
      
  );
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading:loading, currentUser };
    }
  }),
  graphql(QUIZ_ADD, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addQuiz: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let quizData = await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addQuiz: {
                __typename: 'Quiz',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Quiz added.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }))(translate('contact')(QuizAdd));
