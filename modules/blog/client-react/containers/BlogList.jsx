import React from "react";
// import PropTypes from 'prop-types';
import { compose, removeTypename, PLATFORM } from "@gqlapp/core-common";
import { graphql } from "react-apollo";

import { translate } from "@gqlapp/i18n-client-react";
// import { message } from 'antd';
import BLOG_QUERY from "../graphql/BlogsQuery.graphql";
import UPDATE_FILTER from "../graphql/UpdateBlogFilter.client.graphql";
import BLOG_STATE_QUERY from "../graphql/BlogStateQuery.client.graphql";
import BlogListView from "../components/BlogListView";
import { withModels } from "./ModelOperations";
import settings from "@gqlapp/config";

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class BlogList extends React.Component {
  render() {
    return <BlogListView {...this.props} />;
  }
}

// BlogList.propTypes = {
//   subscribeToMore: PropTypes.func,
// };

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
  })
)(translate("blog")(BlogList));
