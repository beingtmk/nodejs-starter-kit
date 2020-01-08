import React from 'react';
// import PropTypes from "prop-types";
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import CommentSectionComponent from '../components/CommentSectionComponent';

class CommentSection extends React.Component {
  //   state = CommentSection;

  //   like = () => {
  //     this.setState({
  //       likes: 1,
  //       dislikes: 0,
  //       action: "liked"
  //     });
  //   };

  //   dislike = () => {
  //     this.setState({
  //       likes: 0,
  //       dislikes: 1,
  //       action: "disliked"
  //     });
  //   };

  render() {
    return (
      <CommentSectionComponent
        {...this.props}
        // comment={this.state}
        // like={this.like}
        // dislike={this.dislike}
      />
    );
  }
}

// CommentSection.propTypes = {
//   match: PropTypes.object
// };

export default translate('comment')(CommentSection);
