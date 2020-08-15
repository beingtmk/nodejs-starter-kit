import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import { translate } from "@gqlapp/i18n-client-react";
import GroupInfoQuizReportView from "../components/GroupInfoQuizReportView";
import GROUP_QUERY from "../graphql/GroupQuery.graphql";
import GROUP_ITEM_SUBSCRIPTION from "../graphql/GroupItemSubscription.graphql";

const subscribeToGroupPage = (subscribeToMore, groupId, history, navigation) =>
  subscribeToMore({
    document: GROUP_ITEM_SUBSCRIPTION,
    variables: { id: groupId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            groupItemUpdated: { mutation, node },
          },
        },
      }
    ) => {
      console.log("subscriptionOfQuiz", mutation, node);
      if (mutation === "UPDATED") {
        return { group: node };
      }
      return prev;
    },
  });

const GroupInfoQuizReport = (props) => {
  useEffect(() => {
    console.log("useEffectGroup", props);
    if (props.group) {
      const {
        subscribeToMore,
        group: { id },
        history,
        navigation,
      } = props;
      const subscribe = subscribeToGroupPage(
        subscribeToMore,
        id,
        history,
        navigation
      );
      return () => subscribe();
    }
  });
  console.log('groupInfoQUizReportContainer', props);
  return <GroupInfoQuizReportView {...props} />;
};

GroupInfoQuizReport.propTypes = {
  match: PropTypes.object,
};

export default compose(
  graphql(GROUP_QUERY, {
    options: (props) => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      console.log("groupquery", props);

      return {
        variables: { id: Number(id) },
      };
    },
    props({ data: { loading, error, group, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { groupLoading: loading, group, subscribeToMore, updateQuery };
    },
  })
)(translate("blog")(GroupInfoQuizReport));
