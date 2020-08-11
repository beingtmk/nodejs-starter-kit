import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { Spin as Loader, Typography, Divider } from "antd";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";
import { Button, PageLayout } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
import QUIZZES_QUERY from "../graphql/QuizzesQuery.graphql";
import GroupQuizReportComponent from "../components/GroupQuizReportComponent";

const {Text, Title, Paragraph} = Typography;

const GroupQuizReport = (props) => {
  const {
    t,
    // , updateQuery, subscribeToMore
  } = props;

  return (
    <>
      <Title level={2}>Quiz Report</Title>
      <Divider />
      {props.loadingQuizzes || !props.quizzes ? (
        <div align="center">
          <Loader />
        </div>
      ) : (
        <>
          <GroupQuizReportComponent {...props} />
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
)(translate("quiz")(GroupQuizReport));
