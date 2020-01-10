import React from 'react';
// import PropTypes from "prop-types";
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { commentData } from '../demoData';
import CommentDataComponent from '../components/CommentDataComponent';

class CommentData extends React.Component {
  state = {
    comments: [commentData, commentData, commentData, commentData, commentData]
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

  render() {
    return (
      <CommentDataComponent {...this.props} comments={this.state.comments} like={this.like} dislike={this.dislike} />
    );
  }
}

// CommentData.propTypes = {
//   match: PropTypes.object
// };

export default translate('comment')(CommentData);
