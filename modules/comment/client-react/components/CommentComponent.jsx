import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment, Icon, Tooltip, Avatar, Menu, Dropdown } from 'antd';
import moment from 'moment';

import Likes from '@gqlapp/like-client-react/containers/Likes';

import CommentFormComponent from './CommentFormComponent';
import { REPLY, EDIT } from '../constants';

const CommentComponent = ({
  children,
  reference,
  currentUser,
  deleteContentComment,
  addContentComment,
  editContentComment,
  referenceId,
  comment: { content, createdAt, user, id }
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
      <Menu.Item key="2" onClick={() => deleteContentComment(id, reference)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  let LikeValues = {
    type: 'COMMENT',
    typeId: id
  };

  const actions = [
    <Likes LikeValues={LikeValues} />,
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
        onSubmit={formState === REPLY ? addContentComment : editContentComment}
        comId={formState === REPLY ? null : id}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={formState}
        reference={reference}
        currentUser={currentUser}
        referenceId={referenceId}
        content={formState === REPLY ? `@${user.username} ` : content}
      />
      <Comment
        actions={currentUser && currentUser.id === user.id ? actions : [actions[0], actions[1]]}
        author={<a>{user.username}</a>}
        avatar={<Avatar src={user.image} alt={user.username} />}
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={createdAt}>
            <span>{moment(createdAt).fromNow()}</span>
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
  currentUser: PropTypes.object,
  referenceId: PropTypes.number,
  reference: PropTypes.string,
  deleteContentComment: PropTypes.func,
  editContentComment: PropTypes.func,
  addContentComment: PropTypes.func
};

export default CommentComponent;
