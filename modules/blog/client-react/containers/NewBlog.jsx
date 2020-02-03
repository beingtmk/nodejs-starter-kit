import React from 'react';
import PropTypes from 'prop-types';
// import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import NewBlogView from '../components/NewBlogView';
import { withModels } from './ModelOperations';

class NewBlog extends React.Component {
  onSubmit = value => {
    message.loading('Please wait...', 0);
    try {
      console.log(value);
    } catch (e) {
      message.destroy();
      message.error('Submission error. Please try again');
      throw Error(e);
    }
    message.destroy();
    message.success('Submission success');
  };

  render() {
    return <NewBlogView onSubmit={this.onSubmit} models={this.props.models} {...this.props} />;
  }
}

NewBlog.propTypes = {
  // onSubmit: PropTypes.func,
  models: PropTypes.array
  // blog: PropTypes.object,
};

export default compose(withModels)(translate('blog')(NewBlog));
