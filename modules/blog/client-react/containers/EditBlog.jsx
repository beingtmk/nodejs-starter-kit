import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import EditBlogView from '../components/EditBlogView';
import { blog } from '../demoData';
import { withModels } from './ModelOperations';

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
    return <EditBlogView blog={blog} onSubmit={this.onSubmit} models={this.props.models} {...this.props} />;
  }
}

EditBlog.propTypes = {
  // onSubmit: PropTypes.func,
  models: PropTypes.array
  // blog: PropTypes.object,
};

export default compose(withModels)(translate('blog')(EditBlog));
