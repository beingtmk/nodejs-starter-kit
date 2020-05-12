import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';

import CommentSectionComponent from '../components/CommentSectionComponent';

import COMMENT_BLOG_SUBSCRIPTION from '../graphql/BlogCommentSubscription.graphql';
import COMMENT_QUERY from '../graphql/BlogCommentsQuery.graphql';
import DELETE_COMMENT from '../graphql/DeleteComment.graphql';
import EDIT_COMMENT from '../graphql/EditComment.graphql';
import ADD_COMMENT from '../graphql/AddComment.graphql';

const CommentSection = props => {
  const { subscribeToMore } = props;
  useEffect(() => {
    return subscribeToBlogComment(subscribeToMore);
    //  () => subscribe();
  });
  return <CommentSectionComponent {...props} />;
};

const onAdd = (prev, node) => {
  // ignore if duplicate
  if (prev.blogComments.some(item => node.id === item.id)) {
    return prev;
  }
  return update(prev, {
    blogComments: {
      $set: [node, ...prev.blogComments]
    }
  });
};

const onDelete = (prev, id) => {
  const index = prev.blogComments.findIndex(item => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    blogComments: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToBlogComment = subscribeToMore =>
  subscribeToMore({
    document: COMMENT_BLOG_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            blogCommentUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAdd(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onDelete(prev, node.id);
        return () => newResult();
      } else if (mutation === 'DELETED') {
        newResult = onDelete(prev, node.id);
      }
      return newResult;
    }
  });

CommentSection.propTypes = {
  blogId: PropTypes.number,
  subscribeToMore: PropTypes.func
};

export default compose(
  graphql(COMMENT_QUERY, {
    options: props => {
      return {
        variables: { blogId: Number(props.blogId) }
      };
    },
    props({ data: { loading, refetch, error, updateQuery, subscribeToMore, blogComments } }) {
      if (error) throw new Error(error);
      return {
        blogCommentLoading: loading,
        blogComments,
        refetch,
        updateQuery,
        subscribeToMore
      };
    }
  }),
  graphql(DELETE_COMMENT, {
    props: ({ mutate }) => ({
      deleteContentComment: async (id, ref) => {
        message.loading('Please wait...', 0);
        try {
          const {
            data: { deleteContentComment }
          } = await mutate({ variables: { id, ref } });

          if (deleteContentComment.errors) {
            return { errors: deleteContentComment.errors };
          }
          message.destroy();
          message.success('Success!');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(EDIT_COMMENT, {
    props: ({ mutate }) => ({
      editContentComment: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({ variables: { input: values } });
          message.destroy();
          message.success('Success.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(ADD_COMMENT, {
    props: ({ mutate }) => ({
      addContentComment: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({ variables: { input: values } });
          message.destroy();
          message.success('Success.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(translate('comment')(CommentSection));
