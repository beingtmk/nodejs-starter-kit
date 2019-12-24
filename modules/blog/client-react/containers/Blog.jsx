import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { blog, moreBlogs } from '../demoData';
import BlogView from '../components/BlogView';

class NewBlog extends React.Component {
  state = { blog, moreBlogs };

  setClap = () => {
    let val = !this.state.blog.clapFlag;
    let clap = this.state.blog.claps + (val ? 1 : -1);
    let tempBlog = this.state.blog;
    tempBlog.clapFlag = val;

    tempBlog.claps = clap;
    console.log(tempBlog, blog);
    this.setState({ blog: tempBlog });
  };
  render() {
    return <BlogView setClap={this.setClap} {...this.props} blog={this.state.blog} moreBlogs={this.state.moreBlogs} />;
  }
}

export default translate('blog')(NewBlog);
