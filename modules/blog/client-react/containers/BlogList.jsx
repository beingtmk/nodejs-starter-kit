import React from 'react';
// import PropTypes from 'prop-types';
import { compose, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import BLOG_QUERY from '../graphql/BlogsQuery.graphql';
import UPDATE_FILTER from '../graphql/UpdateBlogFilter.client.graphql';
import BLOG_STATE_QUERY from '../graphql/BlogStateQuery.client.graphql';
import BlogListView from '../components/BlogListView';
import { withModels } from './ModelOperations';

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
    }
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
      }
    })
  }),
  graphql(BLOG_QUERY, {
    options: ({ filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { filter: filter ? filter : { status: 'published' } }
      };
    },
    props({ data: { loading, blogs, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        blogLoading: loading,
        blogs,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })
)(translate('blog')(BlogList));
