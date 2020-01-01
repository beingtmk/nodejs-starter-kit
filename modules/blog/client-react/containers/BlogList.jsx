import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { moreBlogs } from '../demoData';
import BlogListView from '../components/BlogListView';

class BlogList extends React.Component {
  render() {
    return <BlogListView {...this.props} moreBlogs={moreBlogs} />;
  }
}

export default translate('blog')(BlogList);
