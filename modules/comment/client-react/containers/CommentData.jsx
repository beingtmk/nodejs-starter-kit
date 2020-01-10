import React from 'react';
// import PropTypes from "prop-types";
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import moment from 'moment';
import { comments, user } from '../demoData';
import CommentDataComponent from '../components/CommentDataComponent';

class CommentData extends React.Component {
  state = {
    comments: comments,
    count: 10
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked'
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked'
    });
  };

  addComment = val => {
    let commentContent = {
      id: this.state.count + 1,
      user: user,
      content: val.content,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      likes: 0,
      dislikes: 0,
      action: null,
      replies: []
    };
    if (val.id) {
      console.log('Doing Nothing!');
    } else {
      let tempCom = this.state.comments;
      tempCom.push(commentContent);
      this.setState({ comments: tempCom, count: this.state.count + 1 });
    }
    message.destroy();
  };

  deleteComment = id => {
    // if (val.id) {
    // } else {
    let tempCom = this.state.comments.filter(item => item.id !== id);
    this.setState({ comments: tempCom });
    // }
    message.destroy();
  };

  render() {
    return (
      <CommentDataComponent
        {...this.props}
        comments={this.state.comments}
        like={this.like}
        dislike={this.dislike}
        addComment={this.addComment}
        deleteComment={this.deleteComment}
      />
    );
  }
}

// CommentData.propTypes = {
//   match: PropTypes.object
// };

export default translate('comment')(CommentData);
