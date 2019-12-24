import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import NewBlogView from '../components/NewBlogView';

class NewBlog extends React.Component {
  state = {
    title: '',
    image: '',
    content: '',
    flag: false,
    author: {
      image: 'https://accounts.google.com/SignOutOptions?hl=en-GB&continue=https://www.google.com%3Fhl%3Den-GB',
      firstname: 'Bishal',
      lastname: 'Deb',
      username: 'Zalophus'
    },
    createdAt: '2009-12-10',
    readTime: '5 min'
  };

  onSubmit = value => {
    message.loading('Please wait...', 0);
    try {
      this.setState({
        title: value.title,
        image: value.image,
        content: value.content,
        flag: true
      });
    } catch (e) {
      message.destroy();
      message.error('Submission error. Please try again');
      throw Error(e);
    }
    message.destroy();
    message.success('Submission success');
  };

  render() {
    return <NewBlogView onSubmit={this.onSubmit} {...this.props} />;
  }
}

export default translate('blog')(NewBlog);
