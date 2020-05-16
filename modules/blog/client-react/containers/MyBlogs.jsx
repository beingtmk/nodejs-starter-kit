import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
// import { moreBlogs } from "../demoData";
import MyBlogsView from '../components/MyBlogsView';

import BLOG_SUBSCRIPTION from '../graphql/BlogsSubscription.graphql';
import BLOG_QUERY from '../graphql/OwnBlogsCardQuery.graphql';
import DELETE_BLOG from '../graphql/DeleteBlog.graphql';
import EDIT_BLOG from '../graphql/EditBlog.graphql';

const MyBlogs = props => {
  const { subscribeToMore } = props;
  useEffect(() => {
    const subscribe = subscribeToBlogs(subscribeToMore);
    return () => subscribe();
  });
  return <MyBlogsView {...props} blogs={props.userBlogs} />;
};

MyBlogs.propTypes = {
  subscribeToMore: PropTypes.func,
  userBlogs: PropTypes.array
};

const onAddBlog = (prev, node) => {
  // ignore if duplicate
  if (prev.userBlogs.some(item => node.id === item.id)) {
    return prev;
  }
  return update(prev, {
    userBlogs: {
      $set: [...prev.userBlogs, node]
    }
  });
};

const onDelete = (prev, id) => {
  const index = prev.userBlogs.findIndex(item => item.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    userBlogs: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToBlogs = subscribeToMore =>
  subscribeToMore({
    document: BLOG_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            blogsUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddBlog(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onDelete(prev, node.id);
        return () => newResult();
      } else if (mutation === 'DELETED') {
        newResult = onDelete(prev, node.id);
      }
      return newResult;
    }
  });

export default compose(
  graphql(BLOG_QUERY, {
    props({ data: { loading, userBlogs, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        userBlogs,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  }),
  graphql(DELETE_BLOG, {
    props: ({ mutate }) => ({
      deleteBlog: async id => {
        message.loading('Please wait...', 0);
        try {
          const {
            data: { deleteBlog }
          } = await mutate({ variables: { id } });

          if (deleteBlog.errors) {
            return { errors: deleteBlog.errors };
          }
          message.destroy();
          message.success('Success!');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(EDIT_BLOG, {
    props: ({ mutate }) => ({
      editBlog: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let { data: editBlog } = await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              editBlog: {
                __typename: 'Blog',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Success.');

          return editBlog;
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(translate('blog')(MyBlogs));
