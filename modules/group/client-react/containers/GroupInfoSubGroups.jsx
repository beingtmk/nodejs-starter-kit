import React from "react";
import PropTypes from "prop-types";
import { compose, removeTypename, PLATFORM } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { translate } from "@gqlapp/i18n-client-react";
import { message } from "antd";

import settings from "@gqlapp/config";
import GROUP_SUBSCRIPTION from "../graphql/GroupsSubscription.graphql";
import GROUP_QUERY from "../graphql/GroupsQuery.graphql";
import DELETE_GROUP from "../graphql/DeleteGroup.graphql";
import UPDATE_FILTER from "../graphql/UpdateGroupFilter.client.graphql";
import GROUP_STATE_QUERY from "../graphql/GroupStateQuery.client.graphql";
import GroupInfoSubGroupsView from "../components/GroupInfoSubGroupsView";

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class GroupInfoSubGroups extends React.Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentDidUpdate(prevProps) {
    if (!this.props.groupLoading) {
      const endCursor = this.props.groups
        ? this.props.groups.pageInfo.endCursor
        : 0;
      var groupId;
      if (this.props.match) {
        groupId = this.props.match.params.id;
      } else if (this.props.navigation) {
        groupId = this.props.navigation.state.params.id;
      }
      const prevEndCursor = prevProps.groups
        ? prevProps.groups.pageInfo.endCursor
        : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevEndCursor !== endCursor) {
        this.subscription();
        this.subscription = null;
      }
      if (!this.subscription) {
        this.subscribeToGroups(endCursor, Number(groupId));
      }
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription();
      this.subscription = null;
    }
  }

  subscribeToGroups = (endCursor, groupId) => {
    const { subscribeToMore, filter } = this.props;
    subscribeToMore({
      document: GROUP_SUBSCRIPTION,
      variables: { endCursor, filter, parentGroupId: groupId },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: {
              groupsUpdated: { mutation, node, parentGroupId },
            },
          },
        }
      ) => {
        let newResult = prev;
        if (mutation === "CREATED") {
          newResult = onAddGroup(prev, node);
        } else if (mutation === "UPDATED") {
          newResult = onDelete(prev, node.id);
          return () => newResult();
        } else if (mutation === "DELETED") {
          newResult = onDelete(prev, node.id);
        }
        return newResult;
      },
    });
  };

  render() {
    return <GroupInfoSubGroupsView {...this.props} />;
  }
}

GroupInfoSubGroups.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  groupLoading: PropTypes.bool,
  groups: PropTypes.object,
};

const onAddGroup = (prev, node) => {
  // ignore if duplicate

  if (prev.groups.edges.some((post) => node.id === post.cursor)) {
    return update(prev, {
      groups: {
        totalCount: {
          $set: prev.groups.totalCount - 1,
        },
        edges: {
          $set: prev.groups.edges,
        },
      },
    });
  }

  const filteredPosts = prev.groups.edges.filter(
    (post) => post.node.id !== null
  );

  const edge = {
    cursor: node.id,
    node: node,
    __typename: "GroupEdges",
  };

  return update(prev, {
    groups: {
      totalCount: {
        $set: prev.groups.totalCount + 1,
      },
      edges: {
        $set: [edge, ...filteredPosts],
      },
    },
  });
};

const onDelete = (prev, id) => {
  const index = prev.groups.edges.findIndex((item) => item.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    groups: {
      totalCount: {
        $set: prev.groups.totalCount - 1,
      },
      edges: {
        $splice: [[index, 1]],
      },
    },
  });
};

export default compose(
  graphql(GROUP_STATE_QUERY, {
    props({ data: { groupState } }) {
      return removeTypename(groupState);
    },
  }),
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
    }),
  }),
  graphql(GROUP_QUERY, {
    options: ({ filter, match, navigation }) => {
      let id = 0;
      if (match) {
        id = match.params.id;
      } else if (navigation) {
        id = navigation.state.params.id;
      }
      return {
        fetchPolicy: "network-only",
        variables: { limit, after: 0, filter, groupId: Number(id) },
      };
    },
    props({ data }) {
      const {
        loading,
        error,
        groups,
        fetchMore,
        updateQuery,
        subscribeToMore,
        refetch,
      } = data;
      const allGroups = groups;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: { after },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.groups.totalCount;
            const newEdges = fetchMoreResult.groups.edges;
            const pageInfo = fetchMoreResult.groups.pageInfo;
            const displayedEdges =
              dataDelivery === "add"
                ? [...previousResult.groups.edges, ...newEdges]
                : newEdges;

            return {
              groups: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: "Groups",
              },
            };
          },
        });
      };
      return {
        groupLoading: loading,
        groups: allGroups,
        loadData,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null,
      };
    },
  }),
  graphql(DELETE_GROUP, {
    props: ({ mutate }) => ({
      deleteGroup: async (id) => {
        message.loading("Please wait...", 0);
        try {
          const {
            data: { deleteGroup },
          } = await mutate({ variables: { id } });

          if (deleteGroup.errors) {
            return { errors: deleteGroup.errors };
          }
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
)(translate("group")(GroupInfoSubGroups));
