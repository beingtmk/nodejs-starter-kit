import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {message} from 'antd';
import { compose } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import { translate } from "@gqlapp/i18n-client-react";
import AddMembersFromParentGroupComponent from "../components/AddMembersFromParentGroupComponent";
import GROUP_QUERY from "../graphql/GroupQuery.graphql";
import ADD_GROUP_MEMBER from "../graphql/AddGroupMemberInvite.graphql";
import ADD_GROUP_MEMBERS from "../graphql/AddGroupMembers.graphql";
import CHANGE_GROUP_MEMBER_TYPE from "../graphql/ChangeGroupMemberType.graphql";
import GROUP_ITEM_SUBSCRIPTION from "../graphql/GroupItemSubscription.graphql";

const subscribeToGroupPage = (subscribeToMore, id, history, navigation) =>
  subscribeToMore({
    document: GROUP_ITEM_SUBSCRIPTION,
    variables: { id },
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
      console.log("subscribe", mutation, node);
      if (mutation === "UPDATED") {
        return { group: node };
      }
      return prev;
    },
  });

const ParentGroupMembers = (props) => {
  const { childGroup, group } = props;
  const comparer = (otherArray) => {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other.email == current.email;
        }).length == 0
      );
    };
  };
  var onlyInParentGroup =
    group &&
    group.members &&
    group.members.filter(comparer(childGroup.members));

  useEffect(() => {
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
  console.log("childGroupMembers", group, childGroup);
  return (
    <>
      {onlyInParentGroup && onlyInParentGroup.length !== 0 && (
        <AddMembersFromParentGroupComponent
          {...props}
          onlyInParentGroup={onlyInParentGroup}
        />
      )}
    </>
  );
};

ParentGroupMembers.propTypes = {
  match: PropTypes.object,
};

export default compose(
  graphql(GROUP_QUERY, {
    options: (props) => {
      return {
        variables: {
          id: Number(props.childGroup && props.childGroup.groupId),
        },
      };
    },
    props({ data: { loading, error, group, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { groupLoading: loading, group, subscribeToMore, updateQuery };
    },
  }),
  graphql(ADD_GROUP_MEMBER, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addGroupMember: async (values) => {
        message.destroy();
        message.loading("Please wait...", 0);
        try {
          let addData = await mutate({
            variables: {
              input: values,
            },
          });
          message.destroy();
          message.success("Success!");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  }),
  graphql(ADD_GROUP_MEMBERS, {
    props: ({ mutate }) => ({
      addGroupMembers: async (values) => {
        message.destroy();
        message.loading("Please wait...", 0);
        try {
          const {
            data: { addGroupMembers },
          } = await mutate({
            variables: { input: values },
          });

          message.destroy();
          message.success("Success!");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })
)(translate("group")(ParentGroupMembers));
