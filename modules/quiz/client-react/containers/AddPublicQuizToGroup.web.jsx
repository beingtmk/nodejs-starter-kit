import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { Spin as Loader, Typography, Divider } from "antd";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import QUIZZES_QUERY from "../graphql/QuizzesQuery.graphql";
import AddPublicQuizToGroupComponent from "../components/AddPublicQuizToGroupComponent";

const { Text, Title, Paragraph } = Typography;

const GroupQuizReport = (props) => {
  const {
    t,
    // , updateQuery, subscribeToMore
  } = props;
  console.log("addquiztogroup", props);

  return (
    <>
      {props.loadingQuizzes || !props.quizzes ? (
        <div align="center">
          <Loader />
        </div>
      ) : (
        <>
          <AddPublicQuizToGroupComponent {...props} />
        </>
      )}
    </>
  );
};

GroupQuizReport.propTypes = {
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
          filter: { searchText: "", isPublic:true },
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
)(translate("quiz")(GroupQuizReport));
