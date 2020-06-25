import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@gqlapp/look-client-react';
import CommentComponent from './CommentComponent';

const CommentReplyComponent = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <span>
      {flag && !props.replyCommentLoading ? (
        props.commentReplies.map(item => (
          <CommentComponent key={item.id} referenceId={props.referenceId} comment={item.comment} {...props} />
        ))
      ) : (
        <Loading />
      )}
    </span>
  );
};

CommentReplyComponent.propTypes = {
  t: PropTypes.func,
  referenceId: PropTypes.number,
  replyCommentLoading: PropTypes.bool,
  commentReplies: PropTypes.array
};

export default CommentReplyComponent;
