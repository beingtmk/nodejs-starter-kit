import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment, Icon, Tooltip, Avatar, Menu, Dropdown } from 'antd';
import moment from 'moment';
import CommentFormComponent from './CommentFormComponent';
import { REPLY, EDIT } from '../constants';

const CommentComponent = ({
  like,
  dislike,
  children,
  deleteComment,
  replyComment,
  editComment,
  comment: { likes, dislikes, action, content, time, user, id }
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState(REPLY);

  const RenderForm = val => {
    setModalVisible(true);
    setFormState(val);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => RenderForm(EDIT)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => deleteComment(id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        <Icon type="like" theme={action === 'liked' ? 'filled' : 'outlined'} onClick={like} />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
    </span>,
    <span key="comment-basic-dislike">
      <Tooltip title="Dislike">
        <Icon type="dislike" theme={action === 'disliked' ? 'filled' : 'outlined'} onClick={dislike} />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
    </span>,
    <span key="comment-basic-reply-to" onClick={() => RenderForm(REPLY)}>
      Reply
    </span>,
    <strong>
      <Dropdown overlay={menu} trigger={['hover', 'click']}>
        <Icon type="edit" theme="filled" />
      </Dropdown>
    </strong>
  ];

  return (
    <>
      <CommentFormComponent
        onSubmit={formState === REPLY ? replyComment : editComment}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={formState}
        content={formState === REPLY ? `@${user.username}` : content}
      />
      <Comment
        actions={actions}
        author={<a>{user.username}</a>}
        avatar={<Avatar src={user.image} alt={user.username} />}
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={time}>
            <span>{moment(time).fromNow()}</span>
          </Tooltip>
        }
      >
        {children}
      </Comment>
    </>
  );
};

CommentComponent.propTypes = {
  comment: PropTypes.object,
  children: PropTypes.object,
  like: PropTypes.func,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  replyComment: PropTypes.func,
  dislike: PropTypes.func
};

export default CommentComponent;
