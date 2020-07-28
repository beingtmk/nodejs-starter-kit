import React, { useEffect } from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import QuizAddView from "../components/QuizAddView";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message } from "antd";
import { CurrentUserWrapper } from "@gqlapp/user-client-react";
import QUIZ_SUBSCRIPTION from '../graphql/QuizSubscription.graphql';
import {
  withAddQuizQuery,
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection,
  withSectionSubmitting
  // updateQuizState,
} from "./QuizOperations";


const subscribeToQuizAdd = (subscribeToMore, quizId, history, navigation) =>
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
        return node
      }
      return prev;
    }
  });

const QuizAddContainer = (props) => {
  // const { t, updateQuery, subscribeToMore, quiz, quizLoading } = props;


  useEffect(() => {
    if (props.quiz) {
      const {
        subscribeToMore,
        quiz: { id },
        history,
        navigation
      } = props;
      const subscribe = subscribeToQuizAdd(subscribeToMore, id, history, navigation);
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
      history.push(`/quiz/${newQ.data.addQuiz.id}`);
    } catch (e) {
      throw new FormError(t("serverError"), e);
    }
  };

  return <QuizAddView {...props} onSubmit={onSubmit} />;
};

const QuizAddWithoutCurrentUser = compose(
  withAddQuizQuery,
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection,
  withSectionSubmitting
)(translate("contact")(QuizAddContainer));

const QuizAdd = (props) => {
  return (
    <CurrentUserWrapper>
      <QuizAddWithoutCurrentUser {...props} />
    </CurrentUserWrapper>
  );
};

export default QuizAdd;
