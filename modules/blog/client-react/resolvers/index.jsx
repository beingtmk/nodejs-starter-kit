import update from 'immutability-helper';

import BLOG_STATE_QUERY from '../graphql/BlogStateQuery.client.graphql';

const TYPE_BLOG_STATE = 'BlogState';
const TYPE_BLOG_STATE_FILTER = 'FilterBlogInput';

const defaults = {
  blogState: {
    filter: {
      searchText: '',
      model: '',
      status: '',
      __typename: TYPE_BLOG_STATE_FILTER
    },
    __typename: TYPE_BLOG_STATE
  }
};

const resolvers = {
  Mutation: {
    updateBlogFilter: (_, { filter }, { cache }) => {
      const { blogState } = cache.readQuery({
        query: BLOG_STATE_QUERY
      });

      const newBlogsState = update(blogState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          blogState: newBlogsState,
          __type: TYPE_BLOG_STATE
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};
