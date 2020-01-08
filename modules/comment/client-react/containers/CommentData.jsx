import React from 'react';
// import PropTypes from "prop-types";
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { commentData } from '../demoData';
import CommentDataView from '../components/CommentDataView';

class CommentData extends React.Component {
  state = commentData;

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
    return <CommentDataView {...this.props} comment={this.state} like={this.like} dislike={this.dislike} />;
  }
}

// CommentData.propTypes = {
//   match: PropTypes.object
// };

export default translate('comment')(CommentData);
