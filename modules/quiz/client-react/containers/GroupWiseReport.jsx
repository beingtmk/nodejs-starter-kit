import React from "react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";

import USER_WISE_RESULT_QUERY from "../graphql/UserWiseResultQuery.graphql";

//To Do - Query after state.visible is true
const QuizUserWiseReport = (props) => {
  console.log('quizuserwisereport', props);
  return (
    <>
    <h3>GroupWiseReport</h3>
    </>
  );
};
{/* <QuizUserWiseReportComponent quiz={props.quiz} /> */}

export default compose(
  graphql(USER_WISE_RESULT_QUERY, {
    options: (props) => {
      return {
        variables: { id: Number(props.quizId), groupId: Number(props.groupId) },
      };
    },
    props({ data: { loading, error, getUserWiseResult, refetch } }) {
      if (error) throw new Error(error);
      return {
        quizzLoading: loading,
        quiz: getUserWiseResult,
        refetchResult: refetch,
      };
    },
  }),
  
)(translate("quiz")(QuizUserWiseReport));
