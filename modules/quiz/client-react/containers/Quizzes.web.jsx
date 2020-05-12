import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import  QUIZZES_QUERY from '../graphql/QuizzesQuery.graphql';
import DELETE_USER from '../graphql/DeleteQuiz.graphql'
import QuizzesListView from '../components/QuizzesListView';

// import QuizzesFilterView from '../components/QuizzesFilterView';
// import { useQuizzesWithSubscription } from './withSubscription';
// import {
//   withFilterUpdating,
//   withOrderByUpdating,
//   withQuizzes,
//   withQuizzesDeleting,
//   withQuizzesState,
//   updateQuizzesState
// } from './UserOperations';

const Quizzes = props => {
  const { t
    // , updateQuery, subscribeToMore
   } = props;
  // const filter = { isActive: true };
  // const usersUpdated = useQuizzesWithSubscription(subscribeToMore, filter);

  // useEffect(() => {
  //   if (usersUpdated) {
  //     updateQuizzesState(usersUpdated, updateQuery);
  //   }
  // });

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
          filter:'' }
      };
    },
    props({ data: { loading, quizzes, error } }) {
      if (error) {
        throw new Error(error);
      }
      return { loadingQuizzes:loading, quizzes };
    }
  }),
  graphql(DELETE_USER, {
    props: ({ mutate }) => ({
      deleteQuiz: async id => {
        try {
          const {
            data: { deleteQuiz }
          } = await mutate({
            variables: { id }
          });

          if (deleteQuiz.errors) {
            return { errors: deleteQuiz.errors };
          }
        } catch (e) {
          console.log(e);
        }
      }
    })}),
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
