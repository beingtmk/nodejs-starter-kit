import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { message } from "antd";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import { Button, PageLayout } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
import QUIZZES_QUERY from "../graphql/QuizzesQuery.graphql";
import DELETE_QUIZ from "../graphql/DeleteQuiz.graphql";
import QuizzesListView from "../components/QuizzesListView";
import DUPLICATE_QUIZ from "../graphql/DuplicateQuiz.graphql";
import CURRENT_USER_QUERY from "@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql";

// import QuizzesFilterView from '../components/QuizzesFilterView';
import { useQuizzesWithSubscription } from "./withSubscription";
import {
  withQuizListState,
  withAdminCardQuizList,
  withFeaturedQuizList,
  withFilterUpdating,
  updateQuizListState,
  // withOrderByUpdating,
} from "./QuizListOperations";

const Quizzes = (props) => {
  const { t, updateQuery, subscribeToMore } = props;
  // const filter = { isActive: true };
  const quizzesUpdated = useQuizzesWithSubscription(subscribeToMore);

  useEffect(() => {
    if (quizzesUpdated) {
      updateQuizListState(quizzesUpdated, updateQuery);
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
  return (
    <PageLayout>
      {renderMetaData()}
      <h2>Quizzes</h2>
      <Link to="/quiz-add">
        <Button color="primary">{"Add Quiz"}</Button>
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
  withQuizListState,
  withAdminCardQuizList,
  withFilterUpdating,
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    },
  }),
  graphql(DELETE_QUIZ, {
    props: ({ mutate }) => ({
      deleteQuiz: async (id) => {
        try {
          const {
            data: { deleteQuiz },
          } = await mutate({
            variables: { id },
          });
          message.destroy();
          message.success("Quiz deleted.");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  }),
  graphql(DUPLICATE_QUIZ, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      duplicateQuiz: async (values) => {
        message.destroy();
        message.loading("Please wait...", 0);
        try {
          let quizData = await mutate({
            variables: {
              quizId: values.quizId,
              userId: values.userId,
            },
            optimisticResponse: {
              __typename: "Mutation",
              duplicateQuiz: {
                __typename: "Quiz",
                ...values,
              },
            },
          });

          if (
            quizData &&
            quizData.data &&
            quizData.data.duplicateQuiz &&
            quizData.data.duplicateQuiz.id
          ) {
            history.push(`/quiz/edit/${quizData.data.duplicateQuiz.id}`);
            message.destroy();
            message.success("Quiz duplicateed.");
          } else {
            message.destroy();
            message.error("Couldn't perform the action");
          }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })
)(translate("quiz")(Quizzes));
