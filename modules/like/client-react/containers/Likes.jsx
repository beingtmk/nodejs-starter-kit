import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import BlogLikeComponent from '../components/BlogLikeComponent';
import CommentLikeComponent from '../components/CommentLikeComponent';

import LIKE_SUBSCRIPTION from '../graphql/LikeSubscription.graphql';
import LIKE_QUERY from '../graphql/LikeQuery.graphql';
import DELETE_LIKE from '../graphql/DeleteLikeUser.graphql';
import ADD_LIKE from '../graphql/AddLike.graphql';

const Like = props => {
  const {
    subscribeToMore,
    LikeValues: { type }
  } = props;
  useEffect(() => {
    const subscribe = subscribeToLike(subscribeToMore);
    return () => subscribe();
  });
  return type == 'BLOG' ? <BlogLikeComponent {...props} /> : <CommentLikeComponent {...props} />;
};

const onAdd = (prev, node) => {
  // ignore if duplicate
  if (prev.typeLikes.some(item => node.id === item.id)) {
    return prev;
  }
  return update(prev, {
    typeLikes: {
      $set: [node, ...prev.typeLikes]
    }
  });
};

const onDelete = (prev, id) => {
  const index = prev.typeLikes.findIndex(item => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    typeLikes: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToLike = subscribeToMore =>
  subscribeToMore({
    document: LIKE_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            likesUpdated: { mutation, node }
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

Like.propTypes = {
  LikeValues: PropTypes.object,
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
  graphql(LIKE_QUERY, {
    options: props => {
      return {
        variables: { input: props.LikeValues }
      };
    },
    props({ data: { loading, refetch, error, updateQuery, subscribeToMore, typeLikes } }) {
      if (error) throw new Error(error);
      return {
        likesLoading: loading,
        typeLikes,
        refetch,
        updateQuery,
        subscribeToMore
      };
    }
  }),
  graphql(DELETE_LIKE, {
    props: ({ mutate }) => ({
      deleteLikeUser: async input => {
        message.loading('Please wait...', 0);
        try {
          const {
            data: { deleteLikeUser }
          } = await mutate({ variables: { input } });

          if (deleteLikeUser.errors) {
            return { errors: deleteLikeUser.errors };
          }
          message.destroy();
          message.success('Unliked Successfully!');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(ADD_LIKE, {
    props: ({ mutate }) => ({
      addLike: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({ variables: { input: values } });
          message.destroy();
          message.success('Liked Successfully!');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(translate('comment')(Like));
