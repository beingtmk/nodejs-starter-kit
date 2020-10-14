import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import settings from "@gqlapp/config";
import QUIZZES_QUERY from "../graphql/QuizzesQuery.graphql";
import QuizzesCatalogueView from "../components/QuizzesCatalogueView";

// import QuizzesFilterView from '../components/QuizzesFilterView';
import { useQuizzesWithSubscription } from "./withSubscription";
import {
  withQuizListState,
  withCardQuizList,
  withFeaturedQuizList,
  withFilterUpdating,
  updateQuizListState,
  // withOrderByUpdating,
} from "./QuizListOperations";

const Quizzes = (props) => {
  const { t, updateQuery, subscribeToMore, onIsPublicChange } = props;
  onIsPublicChange(true);
  const filter = { isPublic: false };
  const quizzesUpdated = useQuizzesWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (quizzesUpdated) {
      updateQuizzesState(quizzesUpdated, updateQuery);
    }
  });

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
  console.log("props", props);
  // return <h1>QUizzes</h1>;
  return <QuizzesCatalogueView {...props} />;
};

Quizzes.propTypes = {
  // usersUpdated: PropTypes.object,
  // updateQuery: PropTypes.func,
  // t: PropTypes.func,
  // subscribeToMore: PropTypes.func,
  // filter: PropTypes.object
};

export default compose(
  withQuizListState,
  withCardQuizList,
  withFilterUpdating
  // withOrderByUpdating
  // graphql(QUIZZES_QUERY, {
  //   options: ({
  //     // orderBy,
  //     filter,
  //   }) => {
  //     return {
  //       fetchPolicy: "network-only",
  //       variables: {
  //         // orderBy,
  //         filter: { searchText: "", isPublic:true },
  //       },
  //     };
  //   },
  //   props({ data: { loading, quizzes, error } }) {
  //     if (error) {
  //       throw new Error(error);
  //     }
  //     return { loadingQuizzes: loading, quizzes };
  //   },
  // })
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
