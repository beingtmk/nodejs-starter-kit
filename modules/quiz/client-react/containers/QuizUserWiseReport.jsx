import React from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
// import PersonalQuizResultView from '../components/PersonalQuizResultView';
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message, Modal, Button, Spin as Loader } from "antd";

import USER_WISE_RESULT_QUERY from "../graphql/UserWiseResultQuery.graphql";

//To Do - Query after state.visible is true
const QuizUserWiseReport = (props) => {
  const QuizUserWiseReportComponent = props.QuizUserWiseReportComponent;
  return (
    <>
      {props.quizzLoading && !props.quiz ? (
        <div align="center">
          <Loader />
        </div>
      ) : (
        <>
          <QuizUserWiseReportComponent quiz={props.quiz} />
        </>
      )}
    </>
  );
};

export default compose(
  graphql(USER_WISE_RESULT_QUERY, {
    options: (props) => {
      return {
        variables: { id: Number(props.quizId) },
      };
    },
    props({ data: { loading, error, getUserWiseResult } }) {
      if (error) throw new Error(error);
      return { quizzLoading: loading, quiz: getUserWiseResult };
    },
  })
)(translate("quiz")(QuizUserWiseReport));
