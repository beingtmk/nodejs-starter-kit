import React from 'react';
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import QuizEditView from '../components/QuizEditView';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';

// import CONTACT from '../graphql/QuizAdd.graphql';
// import { QuizAddForm } from '../types';
import QUIZ_EDIT from '../graphql/QuizEdit.graphql';
import QUIZ_QUERY from '../graphql/QuizQuery.graphql';


const QuizAdd = (props) => {
  const onSubmit =  async (values) => {
    const { t, editQuiz, quiz, quizLoading } = props;
    const quizId = !quizLoading && quiz ;
    values.id = quiz.id
    values.userId = quiz.userId; 
    try {
      await editQuiz(values);
    } catch (e) {
      throw new FormError(t('serverError'), e);
    }
  };
  console.log('quiz edit', props);
  return (
    
     <QuizEditView {...props} onSubmit={onSubmit} />
      
  );
};

export default compose(
  graphql(QUIZ_EDIT, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
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
  )(translate('contact')(QuizAdd));
