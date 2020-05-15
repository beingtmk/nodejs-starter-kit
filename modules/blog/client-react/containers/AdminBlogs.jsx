import React from "react";
import PropTypes from "prop-types";
import { compose, removeTypename, PLATFORM } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { translate } from "@gqlapp/i18n-client-react";
import { message } from "antd";

import BLOG_SUBSCRIPTION from "../graphql/BlogsSubscription.graphql";
import BLOG_QUERY from "../graphql/BlogsQuery.graphql";
import DELETE_BLOG from "../graphql/DeleteBlog.graphql";
import UPDATE_FILTER from "../graphql/UpdateBlogFilter.client.graphql";
import BLOG_STATE_QUERY from "../graphql/BlogStateQuery.client.graphql";
import AdminBlogsView from "../components/AdminBlogsView";
import { withModels } from "./ModelOperations";
import settings from "@gqlapp/config";

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class AdminBlogs extends React.Component {
  componentDidMount() {
    const { subscribeToMore, filter } = this.props;
    const subscribe = subscribeToBlogs(subscribeToMore, filter);
    return () => subscribe();
  }

  render() {
    return <AdminBlogsView {...this.props} />;
  }
}

AdminBlogs.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
};

const onAddBlog = (prev, node) => {
  // ignore if duplicate
  if (prev.blogs.edges.some((item) => node.id === item.id)) {
    return prev;
  }
  return update(prev, {
    blogs: {
      totalCount: {
        $set: prev.posts.totalCount + 1,
      },
      edges: {
        $set: [node, ...prev.blogs],
      },
    },
  });
};

const onDelete = (prev, id) => {
  const index = prev.blogs.edges.findIndex((item) => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    blogs: {
      totalCount: {
        $set: prev.blogs.totalCount - 1,
      },
      edges: {
        $splice: [[index, 1]],
      },
    },
  });
};

const subscribeToBlogs = (subscribeToMore, filter) =>
  subscribeToMore({
    document: BLOG_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            blogsUpdated: { mutation, node },
          },
        },
      }
    ) => {
      let newResult = prev;
      if (mutation === "CREATED") {
        newResult = onAddBlog(prev, node);
      } else if (mutation === "UPDATED") {
        newResult = onDelete(prev, node.id);
        return () => newResult();
      } else if (mutation === "DELETED") {
        newResult = onDelete(prev, node.id);
      }
      return newResult;
    },
  });

export default compose(
  withModels,
  graphql(BLOG_STATE_QUERY, {
    props({ data: { blogState } }) {
      return removeTypename(blogState);
    },
  }),
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onModelChange(model) {
        mutate({ variables: { filter: { model } } });
      },
      onStatusChange(status) {
        mutate({ variables: { filter: { status } } });
      },
    }),
  }),
  graphql(BLOG_QUERY, {
    options: ({ filter }) => {
      return {
        fetchPolicy: "network-only",
        variables: { limit, after: 0, filter },
      };
    },
    props({ data }) {
      const {
        loading,
        error,
        blogs,
        fetchMore,
        updateQuery,
        subscribeToMore,
        refetch,
      } = data;
      const allBlogs = blogs;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: { after },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.blogs.totalCount;
            const newEdges = fetchMoreResult.blogs.edges;
            const pageInfo = fetchMoreResult.blogs.pageInfo;
            const displayedEdges =
              dataDelivery === "add"
                ? [...previousResult.blogs.edges, ...newEdges]
                : newEdges;

            return {
              blogs: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: "Blogs",
              },
            };
          },
        });
      };
      return {
        blogLoading: loading,
        blogs: allBlogs,
        loadData,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null,
      };
    },
  }),
  graphql(DELETE_BLOG, {
    props: ({ mutate }) => ({
      deleteBlog: async (id) => {
        message.loading("Please wait...", 0);
        try {
          const {
            data: { deleteBlog },
          } = await mutate({ variables: { id } });

          if (deleteBlog.errors) {
            return { errors: deleteBlog.errors };
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
)(translate("blog")(AdminBlogs));
