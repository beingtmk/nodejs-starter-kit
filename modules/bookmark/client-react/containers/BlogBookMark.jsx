import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import BlogBookmarkComponent from '../components/BlogBookmarkComponent';

import BLOG_BOOKMARK_SUBSCRIPTION from '../graphql/BlogBookmarkSubscription.graphql';
import BLOG_BOOKMARK_QUERY from '../graphql/BlogBookmarkQuery.graphql';
import DELETE_BLOG_BOOKMARK from '../graphql/DeleteBlogBookmark.graphql';
import ADD_BLOG_BOOKMARK from '../graphql/AddBlogBookmark.graphql';

const BlogBookmark = props => {
  const { subscribeToMore } = props;
  useEffect(() => {
    const subscribe = subscribeToBlogBookmark(subscribeToMore);
    return () => subscribe();
  });
  return <BlogBookmarkComponent {...props} />;
};

const onAdd = (prev, node) => {
  return update(prev, {
    userBlogBookmark: {
      $set: node
    }
  });
};

const onDelete = prev => {
  return update(prev, {
    userBlogBookmark: {
      $set: null
    }
  });
};

const subscribeToBlogBookmark = subscribeToMore =>
  subscribeToMore({
    document: BLOG_BOOKMARK_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            blogBookmarksUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAdd(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onDelete(prev);
      } else if (mutation === 'DELETED') {
        newResult = onDelete(prev);
      }
      return newResult;
    }
  });

BlogBookmark.propTypes = {
  subscribeToMore: PropTypes.func
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, currentUser, refetch } }) {
      return {
        currentUserLoading: loading,
        currentUser,
        refetchCurrentUser: refetch
      };
    }
  }),
  graphql(BLOG_BOOKMARK_QUERY, {
    options: ({ blogId }) => {
      return {
        variables: { input: { blogId } }
      };
    },
    props({ data: { loading, refetch, error, updateQuery, subscribeToMore, userBlogBookmark } }) {
      if (error) throw new Error(error);
      return {
        bookmarkLoading: loading,
        userBlogBookmark,
        refetch,
        updateQuery,
        subscribeToMore
      };
    }
  }),
  graphql(DELETE_BLOG_BOOKMARK, {
    props: ({ mutate }) => ({
      deleteBlogBookmark: async values => {
        message.loading('Please wait...', 0);
        try {
          const {
            data: { deleteBlogBookmark }
          } = await mutate({ variables: { input: values } });

          if (deleteBlogBookmark.errors) {
            return { errors: deleteBlogBookmark.errors };
          }
          message.destroy();
          message.success('Removed from Bookmarks Successfully!');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(ADD_BLOG_BOOKMARK, {
    props: ({ mutate }) => ({
      addBlogBookmark: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({ variables: { input: values } });
          message.destroy();
          message.success('Bookmarked Successfully!');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(translate('bookmark')(BlogBookmark));
