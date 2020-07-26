import React, {useEffect} from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import QuizAddView from "../components/QuizAddView";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message } from "antd";
import { CurrentUserWrapper } from "@gqlapp/user-client-react";
import { useQuizzesWithSubscription } from './withSubscription';
import {
  withAddQuizQuery,
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection,
  updateQuizState
} from "./QuizOperations";

const QuizAddContainer = (props) => {
  const { t
    , updateQuery, subscribeToMore
  } = props;
  // const filter = { isActive: true };
  const quizUpdated = useQuizzesWithSubscription(subscribeToMore);

  useEffect(() => {
    if (quizUpdated) {
      updateQuizState(quizUpdated, updateQuery);
    }
  });

  const onSubmit = async (values) => {
    const { t, addQuiz, currentUserLoading, currentUser, history } = props;
    const userId = !currentUserLoading && currentUser && currentUser.id;
    values.userId = userId;
    try {
      const newQ = await editQuiz(values);
      console.log("newww", newQ);
      history.push(`/quiz/${newQ.data.addQuiz.id}`);
    } catch (e) {
      throw new FormError(t("serverError"), e);
    }
  };

  console.log("quiz add form", props);
  return <QuizAddView {...props} onSubmit={onSubmit} />;
};

const QuizAddWithoutCurrentUser = compose(
  withAddQuizQuery,
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection
)(translate("contact")(QuizAddContainer));

const QuizAdd = (props) => {
  return (
    <CurrentUserWrapper>
      <QuizAddWithoutCurrentUser {...props} />
    </CurrentUserWrapper>
  );
};

export default QuizAdd;
