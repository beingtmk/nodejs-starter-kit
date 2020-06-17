import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import QUIZZES_QUERY from '../graphql/QuizzesQuery.graphql';
import DELETE_QUIZ from '../graphql/DeleteQuiz.graphql'
import QuizzesListView from '../components/QuizzesListView';
import DUPLICATE_QUIZ from '../graphql/DuplicateQuiz.graphql';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

// import QuizzesFilterView from '../components/QuizzesFilterView';
import { useQuizzesWithSubscription } from './withSubscription';
import {
  // withFilterUpdating,
  // withOrderByUpdating,
  // withQuizzes,
  // withQuizzesDeleting,
  // withQuizzesState,
  updateQuizzesState
} from './QuizOperations';

const Quizzes = props => {
  const { t
    , updateQuery, subscribeToMore
  } = props;
  // const filter = { isActive: true };
  const quizzesUpdated = useQuizzesWithSubscription(subscribeToMore);

  useEffect(() => {
    if (quizzesUpdated) {
      updateQuizzesState(quizzesUpdated, updateQuery);
    }
  });

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${'Quiz List'}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('users.meta')}`
        }
      ]}
    />
  );
  console.log('quizzes list', props)
  return (
    <PageLayout>
      {renderMetaData()}
      <h2>Quizzes</h2>
      <Link to="/quiz-add">
        <Button color="primary">{'Add Quiz'}</Button>
      </Link>
      <hr />

      {/* <QuizzesFilterView {...props} filter={filter} />
      <hr />*/}
      <QuizzesListView {...props} />
    </PageLayout>
  );
};

Quizzes.propTypes = {
  // usersUpdated: PropTypes.object,
  // updateQuery: PropTypes.func,
  // t: PropTypes.func,
  // subscribeToMore: PropTypes.func,
  // filter: PropTypes.object
};

export default compose(
  graphql(QUIZZES_QUERY, {
    options: ({
      // orderBy,
      filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          // orderBy, 
          filter: {searchText:''}
        }
      };
    },
    props({ data: { loading, quizzes, error, updateQuery, subscribeToMore } }) {
      if (error) {
        throw new Error(error);
      }
      return { loadingQuizzes: loading, quizzes, updateQuery, subscribeToMore };
    }
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(DELETE_QUIZ, {
    props: ({ mutate }) => ({
      deleteQuiz: async id => {
        try {
          const {
            data: { deleteQuiz }
          } = await mutate({
            variables: { id }
          });
          message.destroy();
          message.success('Quiz deleted.');
        } catch (e) {
          console.log(e);
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(DUPLICATE_QUIZ, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      duplicateQuiz: async values => {

        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let quizData = await mutate({
            variables: {
              quizId: values.quizId,
              userId: values.userId
            },
            optimisticResponse: {
              __typename: 'Mutation',
              duplicateQuiz: {
                __typename: 'Quiz',
                ...values
              }
            }
          });

          if (quizData && quizData.data && quizData.data.duplicateQuiz && quizData.data.duplicateQuiz.id) {

            message.destroy();
            message.success('Quiz duplicateed.');
          } else {

            message.destroy();
            message.error("Couldn't perform the action");
          }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  // graphql(QUIZZES_QUERY, {
  //   options: ({ 
  //     // orderBy,
  //      filter }) => {
  //     return {
  //       fetchPolicy: 'network-only',
  //       variables: { 
  //         // orderBy, 
  //         filter:'' }
  //     };
  //   },
  //   props({ data: { loading, quizzes
  //     // , refetch, error, updateQuery, subscribeToMore
  //    } }) {
  //     return { loadingQuizzes:loading, quizzes
  //       // , refetch, subscribeToMore, updateQuery, errors: error ? error.graphQLErrors : null 
  //     };
  //   }
  // })
  // withUsersState,
  // withUsers,
  // withUsersDeleting,
  // withOrderByUpdating,
  // withFilterUpdating
)(translate('quiz')(Quizzes));
