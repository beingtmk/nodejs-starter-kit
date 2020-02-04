import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import NewBlogView from '../components/NewBlogView';
import { withModels } from './ModelOperations';
import ADD_BLOG from '../graphql/AddBlog.graphql';

class NewBlog extends React.Component {
  render() {
    return <NewBlogView onSubmit={this.props.addBlog} models={this.props.models} {...this.props} />;
  }
}

NewBlog.propTypes = {
  addBlog: PropTypes.func,
  models: PropTypes.array
};

export default compose(
  withModels,
  graphql(ADD_BLOG, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addBlog: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let blogData = await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addBlog: {
                __typename: 'Blog',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Blog added.');
          if (history) {
            return history.push('/blog/' + blogData.data.addBlog.id, {
              blog: blogData.data.addBlog
            });
          } else if (navigation) {
            return navigation.navigate('Blog', {
              id: blogData.data.addBlog.id
            });
          }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(translate('blog')(NewBlog));
