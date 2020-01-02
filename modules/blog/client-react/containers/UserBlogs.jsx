import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { moreBlogs, user } from '../demoData';
import UserBlogsView from '../components/UserBlogsView';

class UserBlogs extends React.Component {
  render() {
    console.log(this.props.match);
    let author = user;
    author['blogs'] = moreBlogs;
    author.blogs.map(obj => (obj.author = user));
    return <UserBlogsView {...this.props} author={author} />;
  }
}

UserBlogs.propTypes = {
  match: PropTypes.object
};

export default translate('blog')(UserBlogs);
