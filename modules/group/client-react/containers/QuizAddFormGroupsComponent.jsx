import React from "react";
import PropTypes from "prop-types";
import { compose, removeTypename, PLATFORM } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { translate } from "@gqlapp/i18n-client-react";
import { message, Select } from "antd";
import { FormItem } from "@gqlapp/look-client-react";

import settings from "@gqlapp/config";
import GROUP_SUBSCRIPTION from "../graphql/GroupsSubscription.graphql";
import GROUP_QUERY from "../graphql/GroupsQuery.graphql";
import UPDATE_FILTER from "../graphql/UpdateGroupFilter.client.graphql";
import GROUP_STATE_QUERY from "../graphql/GroupStateQuery.client.graphql";
// import QuizAddFormGroupsComponentView from "../components/QuizAddFormGroupsComponentView";

const { Option } = Select;

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class QuizAddFormGroupsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.subscription = null;
  }

  componentDidUpdate(prevProps) {
    if (!this.props.groupLoading) {
      const endCursor = this.props.groups
        ? this.props.groups.pageInfo.endCursor
        : 0;
      const prevEndCursor = prevProps.groups
        ? prevProps.groups.pageInfo.endCursor
        : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevEndCursor !== endCursor) {
        this.subscription();
        this.subscription = null;
      }
      if (!this.subscription) {
        this.subscribeToGroups(endCursor);
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

  subscribeToGroups = (endCursor) => {
    const { subscribeToMore, filter } = this.props;
    subscribeToMore({
      document: GROUP_SUBSCRIPTION,
      variables: { endCursor, filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: {
              groupsUpdated: { mutation, node },
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

  onChange = (value) => {
    const {
      formik: { setFieldValue },
      name,
    } = this.props;
    console.log(`selected ${value}`);
    // this.setState({ value });
    setFieldValue(name, value);
  };

  onSearch = (val) => {
    console.log("search:", val);
    const { onSearchTextChange } = this.props;
    onSearchTextChange(val);
  };

  render() {
    console.log("QuizAddForm", this.props);
    const { groupLoading, groups, label, value, loadData } = this.props;
    if (value) {
      loadData(value, "add");
    }
    return (
      <FormItem label={label}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={this.onChange}
          onSearch={this.onSearch}
          value={value}
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
          //   0
          // }
        >
          <Option value={null} key="null">
            None
          </Option>
          {groupLoading ? (
            <Option value="loading" disabled key="loading">
              loading....
            </Option>
          ) : (
            groups &&
            groups.edges &&
            groups.edges.map((groupNode, i) => (
              <Option
                key={groupNode && groupNode.node && groupNode.node.id}
                value={groupNode && groupNode.node && groupNode.node.id}
              >
                {groupNode && groupNode.node && groupNode.node.title}
              </Option>
            ))
          )}
        </Select>
      </FormItem>
    );
  }
}

QuizAddFormGroupsComponent.propTypes = {
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
        console.log("onSearchTextChange", searchText);
        mutate({ variables: { filter: { searchText } } });
      },
    }),
  }),
  graphql(GROUP_QUERY, {
    options: ({ filter }) => {
      return {
        fetchPolicy: "network-only",
        variables: { limit: 10, after: 0, filter },
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
  })
)(translate("group")(QuizAddFormGroupsComponent));
