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
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentDidUpdate(prevProps) {
    if (!this.props.blogLoading) {
      const endCursor = this.props.blogs
        ? this.props.blogs.pageInfo.endCursor
        : 0;
      const prevEndCursor = prevProps.blogs
        ? prevProps.blogs.pageInfo.endCursor
        : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevEndCursor !== endCursor) {
        this.subscription();
        this.subscription = null;
      }
      if (!this.subscription) {
        this.subscribeToBlogs(endCursor);
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

  subscribeToBlogs = (endCursor) => {
    const { subscribeToMore, filter } = this.props;
    subscribeToMore({
      document: BLOG_SUBSCRIPTION,
      variables: { endCursor, filter },
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
  };

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
  if (prev.blogs.edges.some((post) => node.id === post.cursor)) {
    return update(prev, {
      blogs: {
        totalCount: {
          $set: prev.blogs.totalCount - 1,
        },
        edges: {
          $set: prev.blogs.edges,
        },
      },
    });
  }

  const filteredPosts = prev.blogs.edges.filter(
    (post) => post.node.id !== null
  );

  const edge = {
    cursor: node.id,
    node: node,
    __typename: "BlogEdges",
  };

  return update(prev, {
    blogs: {
      totalCount: {
        $set: prev.blogs.totalCount + 1,
      },
      edges: {
        $set: [edge, ...filteredPosts],
      },
    },
  });
};

const onDelete = (prev, id) => {
  const index = prev.blogs.edges.findIndex((item) => item.node.id === id);

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
