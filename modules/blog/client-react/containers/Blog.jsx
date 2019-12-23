import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
// import { message } from 'antd';
import { blog } from '../demoData';
import BlogView from '../components/BlogView';

class NewBlog extends React.Component {
  state = { ...blog };

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
