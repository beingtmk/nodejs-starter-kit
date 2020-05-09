import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
// import { moreBlogs } from "../demoData";
import BLOG_QUERY from '../graphql/MiniBlogsCardQuery.graphql';
import BlogListView from '../components/BlogListView';

class BlogList extends React.Component {
  render() {
    return <BlogListView {...this.props} moreBlogs={this.props.blogs} />;
  }
}

BlogList.propTypes = {
  // subscribeToMore: PropTypes.func
  blogs: PropTypes.array
};

export default compose(
  graphql(BLOG_QUERY, {
    // options: ({ orderBy, filter }) => {
    //   return {
    //     fetchPolicy: 'network-only',
    //     variables: { orderBy, filter }
    //   };
    // },
    props({ data: { loading, blogs, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        blogs,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })
)(translate('blog')(BlogList));
