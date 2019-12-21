import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import BlogView from '../components/BlogView';

class NewBlog extends React.Component {
  state = {
    title: 'Hey Bishal Here',
    image: 'https://miro.medium.com/fit/c/40/40/2*_KGzadiy9s83D4vzhsCyyg.png',
    content: '<h3>Bishal Here again</h3>',
    author: {
      image: 'https://miro.medium.com/fit/c/40/40/2*_KGzadiy9s83D4vzhsCyyg.png',
      firstname: 'Bishal',
      lastname: 'Deb',
      username: 'Zalophus'
    },
    createdAt: '2009-12-10',
    readTime: '5 min',
    claps: 125,
    clapFlag: true
  };

  setClap = () => {
    let val = !this.state.clapFlag;
    let clap = this.state.claps + (val ? 1 : -1);
    this.setState({ clapFlag: val, claps: clap });
  };
  render() {
    return <BlogView setClap={this.setClap} {...this.props} blog={this.state} />;
  }
}

export default translate('blog')(NewBlog);
