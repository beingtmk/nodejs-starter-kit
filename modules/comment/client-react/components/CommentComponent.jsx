import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Icon, Tooltip, Avatar, Menu, Dropdown } from 'antd';
import moment from 'moment';

export default class CommentDataComponent extends React.Component {
  render() {
    const { likes, dislikes, action, content, time, user, id } = this.props.comment;
    const { like, dislike, children, deleteComment } = this.props;

    const menu = (
      <Menu>
        <Menu.Item key="1">Edit</Menu.Item>
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
      <span key="comment-basic-reply-to">Reply</span>,
      <strong>
        <Dropdown overlay={menu} trigger={['hover', 'click']}>
          <Icon type="edit" theme="filled" />
        </Dropdown>
      </strong>
    ];

    return (
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
    );
  }
}

CommentDataComponent.propTypes = {
  comment: PropTypes.object,
  children: PropTypes.object,
  like: PropTypes.func,
  deleteComment: PropTypes.func,
  dislike: PropTypes.func
};
