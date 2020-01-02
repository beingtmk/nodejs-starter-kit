import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { blog, moreBlogs } from '../demoData';
import BlogView from '../components/BlogView';

class Blog extends React.Component {
  render() {
    console.log(this.props.match);

    return <BlogView {...this.props} blog={blog} moreBlogs={moreBlogs} />;
  }
}

Blog.propTypes = {
  match: PropTypes.object
};

export default translate('blog')(Blog);
