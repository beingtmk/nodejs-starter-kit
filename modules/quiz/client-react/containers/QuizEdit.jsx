import React, { useEffect } from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import QuizEditView from "../components/QuizEditView";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message } from "antd";
import { CurrentUserWrapper } from "@gqlapp/user-client-react";
import QUIZ_SUBSCRIPTION from '../graphql/QuizSubscription.graphql';
import QUIZ_QUERY from '../graphql/QuizQuery.graphql';
import {
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection,
  withSectionSubmitting
  // updateQuizState,
} from "./QuizOperations";


const subscribeToQuizEdit = (subscribeToMore, quizId, history, navigation) =>
  subscribeToMore({
    document: QUIZ_SUBSCRIPTION,
    variables: { id: quizId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            quizUpdated: { mutation, node }
          }
        }
      }
    ) => {
      if (mutation === 'UPDATED') {
        return {quiz:node}
      }
      return prev;
    }
  });

const QuizEditContainer = (props) => {
  // const { t, updateQuery, subscribeToMore, quiz, quizLoading } = props;


  useEffect(() => {
    if (props.quiz) {
      const {
        subscribeToMore,
        quiz: { id },
        history,
        navigation
      } = props;
      const subscribe = subscribeToQuizEdit(subscribeToMore, id, history, navigation);
      return () => subscribe();
    }
  });

  // const quizId = !quizLoading && quiz && quiz.id;
  // const quizUpdated = useQuizWithSubscription(subscribeToMore, quizId);
  // console.log("quiz updated container", quizUpdated);
  // useEffect(() => {
  //   if (quizUpdated) {
  //     console.log("quiz updated container use effect", quizUpdated);
  //     updateQuizState(quizUpdated, updateQuery);
  //   }
  // });

  const onSubmit = async (values) => {
    const { t, editQuiz, currentUserLoading, currentUser, history } = props;
    const userId = !currentUserLoading && currentUser && currentUser.id;
    values.userId = userId;
    try {
      const newQ = await editQuiz(values);
      // history.push(`/quiz/${newQ.data.editQuiz.id}`);
    } catch (e) {
      throw new FormError(t("serverError"), e);
    }
  };
  return <QuizEditView {...props} onSubmit={onSubmit} />;
};

const QuizEditWithoutCurrentUser = compose(
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
    props({ data: { loading, error, quiz, refetch, updateQuery, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { quizLoading: loading, quiz, refetch, updateQuery, subscribeToMore };
    }
  }),
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection,
  withSectionSubmitting
)(translate("contact")(QuizEditContainer));

const QuizEdit = (props) => {
  return (
    <CurrentUserWrapper>
      <QuizEditWithoutCurrentUser {...props} />
    </CurrentUserWrapper>
  );
};

export default QuizEdit;

