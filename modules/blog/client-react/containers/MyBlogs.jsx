import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { moreBlogs } from '../demoData';
import MyBlogsView from '../components/MyBlogsView';

class MyBlogs extends React.Component {
  render() {
    return <MyBlogsView {...this.props} blogs={moreBlogs} />;
  }
}

export default translate('blog')(MyBlogs);
