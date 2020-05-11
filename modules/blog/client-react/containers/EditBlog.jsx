import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import EditBlogView from '../components/EditBlogView';
import { withModels } from './ModelOperations';
import EDIT_BLOG from '../graphql/EditBlog.graphql';
import BLOG_QUERY from '../graphql/EditBLogQuery.graphql';
import { removeTypename } from '../constants';

class EditBlog extends React.Component {
  render() {
    return (
      <EditBlogView blog={this.props.blog} onSubmit={this.props.editBlog} models={this.props.models} {...this.props} />
    );
  }
}

EditBlog.propTypes = {
  editBlog: PropTypes.func,
  models: PropTypes.array,
  blog: PropTypes.object
};

export default compose(
  withModels,
  graphql(BLOG_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, blog } }) {
      if (error) throw new Error(error);
      return { loading, blog };
    }
  }),
  graphql(EDIT_BLOG, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      editBlog: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        let input = removeTypename(values);
        try {
          let blogData = await mutate({
            variables: {
              input
            },
            optimisticResponse: {
              __typename: 'Mutation',
              editBlog: {
                __typename: 'Blog',
                ...input
              }
            }
          });

          message.destroy();
          message.success('Success.');
          if (history) {
            return history.push('/blog/' + blogData.data.editBlog.id, {
              blog: blogData.data.editBlog
            });
          } else if (navigation) {
            return navigation.navigate('Blog', {
              id: blogData.data.editBlog.id
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
)(translate('blog')(EditBlog));
