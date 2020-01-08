import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';

export default class CommentDataComponent extends React.Component {
  render() {
    const { likes, dislikes, action, content, time, user } = this.props.comment;
    const { like, dislike } = this.props;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like" theme={action === 'liked' ? 'filled' : 'outlined'} onClick={like} />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon type="dislike" theme={action === 'disliked' ? 'filled' : 'outlined'} onClick={dislike} />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
      <span key="comment-basic-reply-to">Reply</span>
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
      />
    );
  }
}

CommentDataComponent.propTypes = {
  comment: PropTypes.object,
  like: PropTypes.func,
  dislike: PropTypes.func
};
