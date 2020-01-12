import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading, Button } from '@gqlapp/look-client-react';
import CommentComponent from './CommentComponent';
import CommentFormComponent from './CommentFormComponent';

const CommentDataComponent = props => {
  const [flag, setflag] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <span>
      {flag ? (
        <>
          <Button color="primary" onClick={() => setModalVisible(true)}>
            Add Comment
          </Button>
          <CommentFormComponent
            onSubmit={props.addComment}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            title="Add a comment"
          />
          {props.comments.map(item => (
            <CommentComponent refId={item.id} comment={item} {...props}>
              {item.replies.map(reply => (
                <CommentComponent refId={item.id} comment={reply} {...props} />
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
