import React from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import QuizAttendeesView from "../components/QuizAttendeesView";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message } from "antd";
import QUIZ_ATTENDEES_QUERY from "../graphql/QuizAttendeesQuery.graphql";
import CURRENT_USER_QUERY from "@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql";

const Quiz = (props) => {
  if (props.currentUser && props.currentUser.role !== "admin") {
    props.history.push("/profile");
  }
  return <QuizAttendeesView {...props} />;
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    },
  }),
  graphql(QUIZ_ATTENDEES_QUERY, {
    options: (props) => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) },
      };
    },
    props({ data: { loading, error, getAttendees } }) {
      if (error) throw new Error(error);
      return { quizLoading: loading, attempts: getAttendees };
    },
  })
)(translate("quiz")(Quiz));
