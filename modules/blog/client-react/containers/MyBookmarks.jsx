import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { moreBlogs } from '../demoData';
import MyBookmarksView from '../components/MyBookmarksView';

class MyBookmarks extends React.Component {
  render() {
    return <MyBookmarksView {...this.props} moreBlogs={moreBlogs} />;
  }
}

export default translate('blog')(MyBookmarks);
