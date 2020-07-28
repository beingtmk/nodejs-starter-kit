import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { Spin as Loader } from "antd";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import { Button, PageLayout } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
import QUIZZES_QUERY from "../graphql/QuizzesQuery.graphql";
import DELETE_QUIZ from "../graphql/DeleteQuiz.graphql";
import QuizzesCatalogueView from "../components/QuizzesCatalogueView";

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

const Quizzes = (props) => {
  const {
    t,
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
      title={`${settings.app.name} - ${"Quiz List"}`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - ${t("users.meta")}`,
        },
      ]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      <h1>Quizzes</h1>

      <hr />

      {/* <QuizzesFilterView {...props} filter={filter} />
      <hr />*/}
      {props.loadingQuizzes || !props.quizzes ? (
        <div align="center">
          <Loader />
        </div>
      ) : (
        <>
          <QuizzesCatalogueView {...props} />
        </>
      )}
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
      filter,
    }) => {
      return {
        fetchPolicy: "network-only",
        variables: {
          // orderBy,
          filter: {searchText:''},
        },
      };
    },
    props({ data: { loading, quizzes, error } }) {
      if (error) {
        throw new Error(error);
      }
      return { loadingQuizzes: loading, quizzes };
    },
  })
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
)(translate("quiz")(Quizzes));
