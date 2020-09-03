import React from "react";
import { Spin as Loader } from 'antd'
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import { graphql } from "react-apollo";
import { compose} from "@gqlapp/core-common";
import QuizUserWiseReportComponent from "../components/QuizUserWiseReportComponent";
import USER_WISE_RESULT_QUERY from "../graphql/UserWiseResultQuery.graphql";

//To Do - Query after state.visible is true
const QuizUserWiseReport = (props) => {

  return (
    <>
      {props.quizzLoading && (
        <div align="center">
          <Loader />
        </div>
      )}
      {!props.quizzLoading && props.quiz && (
        <QuizUserWiseReportComponent
          quiz={props.quiz}
          userFId={props.userFId}
        />
      )}
    </>
  );
};

{
  /* <h3>GroupWiseReport</h3> */
}
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
  })
)(translate("quiz")(QuizUserWiseReport));
