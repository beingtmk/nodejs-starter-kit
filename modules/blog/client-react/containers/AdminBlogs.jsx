import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { moreBlogs } from '../demoData';
import AdminBlogsView from '../components/AdminBlogsView';

class AdminBlogs extends React.Component {
  render() {
    return <AdminBlogsView {...this.props} blogsList={moreBlogs} />;
  }
}

export default translate('blog')(AdminBlogs);
