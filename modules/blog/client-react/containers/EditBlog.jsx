import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import EditBlogView from '../components/EditBlogView';
import { model, blog } from '../demoData';

class EditBlog extends React.Component {
  onSubmit = value => {
    message.loading('Please wait...', 0);
    try {
      console.log(value);
      message.success('Editing...');
    } catch (e) {
      message.destroy();
      message.error('Submission error. Please try again');
      throw Error(e);
    }
    message.destroy();
    message.success('Submission success');
  };

  render() {
    return <EditBlogView blog={blog} onSubmit={this.onSubmit} model={model} {...this.props} />;
  }
}

export default translate('blog')(EditBlog);
