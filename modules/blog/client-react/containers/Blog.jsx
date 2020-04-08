import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import { moreBlogs } from '../demoData';
import BlogView from '../components/BlogView';

import BLOG_QUERY from '../graphql/BlogQuery.graphql';

class Blog extends React.Component {
  // state = blog;

  render() {
    // if (this.props.blog) this.state = { ...this.state, ...this.props.blog };
    return <BlogView {...this.props} moreBlogs={moreBlogs} />;
  }
}

Blog.propTypes = {
  match: PropTypes.object
};

export default compose(
  graphql(BLOG_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, blog } }) {
      if (error) throw new Error(error);
      return { loading, blog };
    }
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, currentUser, refetch } }) {
      return {
        currentUserLoading: loading,
        currentUser,
        refetchCurrentUser: refetch
      };
    }
  })
)(translate('blog')(Blog));
