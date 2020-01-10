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
          <CommentFormComponent />
          {props.comments.map(item => (
            <CommentComponent comment={item} {...props} />
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
  comments: PropTypes.array
};

export default CommentDataComponent;
