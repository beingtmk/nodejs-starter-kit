import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading, Button } from '@gqlapp/look-client-react';
import { Collapse } from 'antd';

import CommentReply from '../containers/CommentReply';

import CommentComponent from './CommentComponent';
import CommentFormComponent from './CommentFormComponent';

const { Panel } = Collapse;

const CommentSectionComponent = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  console.log('PROPS', props);
  return (
    <span>
      {flag && !props.blogCommentLoading ? (
        <Collapse>
          <Panel header={<h1>{props.header}</h1>} key="1">
            <>
              <Button color="primary" onClick={() => setModalVisible(true)}>
                Add Comment
              </Button>
              <CommentFormComponent
                blogId={props.blogId}
                onSubmit={props.addContentComment}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                title="Add a comment"
              />
              {props.blogComments.map(item => (
                <CommentComponent reference={'BLOG'} referenceId={item.comment.id} comment={item.comment} {...props}>
                  <CommentReply
                    reference={'REPLY'}
                    deleteContentComment={props.deleteContentComment}
                    addContentComment={props.addContentComment}
                    editContentComment={props.editContentComment}
                    referenceId={item.comment.id}
                  />
                </CommentComponent>
              ))}
            </>
          </Panel>
        </Collapse>
      ) : (
        <Loading />
      )}
    </span>
  );
};

CommentSectionComponent.propTypes = {
  t: PropTypes.func,
  blogCommentLoading: PropTypes.bool,
  addContentComment: PropTypes.func,
  editContentComment: PropTypes.func,
  deleteContentComment: PropTypes.func,
  blogComments: PropTypes.array,
  header: PropTypes.string,
  blogId: PropTypes.number
};

export default CommentSectionComponent;
