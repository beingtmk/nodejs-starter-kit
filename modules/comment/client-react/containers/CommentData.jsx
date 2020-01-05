import React from 'react';
// import PropTypes from "prop-types";
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
// import { CommentData, moreCommentDatas } from '../demoData';
import CommentDataView from '../components/CommentDataView';

class CommentData extends React.Component {
  render() {
    return (
      <CommentDataView
      //   {...this.props} blog={blog} moreBlogs={moreBlogs}
      />
    );
  }
}

// CommentData.propTypes = {
//   match: PropTypes.object
// };

export default translate('comment')(CommentData);
