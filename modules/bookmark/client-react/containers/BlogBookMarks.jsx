import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import { translate } from '@gqlapp/i18n-client-react';

import BlogBookmarksView from '../components/BlogBookmarksView';

import BLOG_BOOKMARK_SUBSCRIPTION from '../graphql/BlogBookmarkSubscription.graphql';
import BLOG_BOOKMARK_QUERY from '../graphql/BlogBookmarksQuery.graphql';

const BlogBookmarks = props => {
  const { subscribeToMore } = props;
  useEffect(() => {
    const subscribe = subscribeToBlogBookmarks(subscribeToMore);
    return () => subscribe();
  });
  return <BlogBookmarksView {...props} />;
};

const onAdd = (prev, node) => {
  // ignore if duplicate
  if (prev.userBlogBookmarks.some(item => node.id === item.id)) {
    return prev;
  }

  return update(prev, {
    userBlogBookmarks: {
      $set: [node, ...prev.userBlogBookmarks]
    }
  });
};

const onDelete = (prev, id) => {
  const index = prev.userBlogBookmarks.findIndex(item => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    userBlogBookmarks: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToBlogBookmarks = subscribeToMore =>
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
        newResult = onDelete(prev, node.id);
      } else if (mutation === 'DELETED') {
        newResult = onDelete(prev, node.id);
      }
      return newResult;
    }
  });

BlogBookmarks.propTypes = {
  subscribeToMore: PropTypes.func
};

export default compose(
  graphql(BLOG_BOOKMARK_QUERY, {
    props({ data: { loading, refetch, error, updateQuery, subscribeToMore, userBlogBookmarks } }) {
      if (error) throw new Error(error);
      return {
        bookmarkLoading: loading,
        userBlogBookmarks,
        refetch,
        updateQuery,
        subscribeToMore
      };
    }
  })
)(translate('bookmark')(BlogBookmarks));
