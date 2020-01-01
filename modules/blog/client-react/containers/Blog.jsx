import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { blog, moreBlogs } from '../demoData';
import BlogView from '../components/BlogView';

class Blog extends React.Component {
  render() {
    return <BlogView {...this.props} blog={blog} moreBlogs={moreBlogs} />;
  }
}

export default translate('blog')(Blog);
