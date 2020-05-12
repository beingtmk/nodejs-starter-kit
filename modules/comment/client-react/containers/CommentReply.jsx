import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import { translate } from '@gqlapp/i18n-client-react';

import CommentReplyComponent from '../components/CommentReplyComponent';

import COMMENT_REPLY_SUBSCRIPTION from '../graphql/ReplyCommentSubscription.graphql';
import COMMENT_QUERY from '../graphql/ReplyCommentsQuery.graphql';

const CommentReply = props => {
  const { subscribeToMore, referenceId } = props;
  useEffect(() => {
    const subscribe = subscribeToBlogComment(subscribeToMore, referenceId);
    return () => subscribe();
  });
  return <CommentReplyComponent {...props} />;
};

const onAdd = (prev, node, referenceId) => {
  // ignore if duplicate
  if (prev.commentReplies.some(item => node.id === item.id) || referenceId !== node.reference.id) {
    return prev;
  }

  return update(prev, {
    commentReplies: {
      $set: [node, ...prev.commentReplies]
    }
  });
};

const onDelete = (prev, id) => {
  const index = prev.commentReplies.findIndex(item => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    commentReplies: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToBlogComment = (subscribeToMore, referenceId) =>
  subscribeToMore({
    document: COMMENT_REPLY_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            replyCommentUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAdd(prev, node, referenceId);
      } else if (mutation === 'UPDATED') {
        newResult = onDelete(prev, node.id);
        return () => newResult();
      } else if (mutation === 'DELETED') {
        newResult = onDelete(prev, node.id);
      }
      return newResult;
    }
  });

CommentReply.propTypes = {
  referenceId: PropTypes.number,
  subscribeToMore: PropTypes.func
};

export default compose(
  graphql(COMMENT_QUERY, {
    options: props => {
      return {
        variables: { referenceId: Number(props.referenceId) }
      };
    },
    props({ data: { loading, refetch, error, updateQuery, subscribeToMore, commentReplies } }) {
      if (error) throw new Error(error);
      return {
        replyCommentLoading: loading,
        commentReplies,
        refetch,
        updateQuery,
        subscribeToMore
      };
    }
  })
)(translate('comment')(CommentReply));
