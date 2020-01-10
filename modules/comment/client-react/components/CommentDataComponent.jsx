import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@gqlapp/look-client-react';
import CommentComponent from './CommentComponent';
import CommentFormComponent from './CommentFormComponent';

const CommentDataComponent = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <span>
      {flag ? (
        <>
          <CommentFormComponent onSubmit={props.addComment} />
          {props.comments.map(item => (
            <CommentComponent comment={item} {...props}>
              {item.replies.map(reply => (
                <CommentComponent comment={reply} {...props} />
              ))}
            </CommentComponent>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </span>
  );
};

CommentDataComponent.propTypes = {
  t: PropTypes.func,
  addComment: PropTypes.func,
  comments: PropTypes.array
};

export default CommentDataComponent;
