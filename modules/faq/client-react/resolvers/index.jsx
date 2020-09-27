import update from 'immutability-helper';

// import COMMENT_QUERY_CLIENT from '../graphql/CommentQuery.client.graphql';
import FAQ_STATE_QUERY from '../graphql/FaqStateQuery.client.graphql';

// const TYPE_NAME = 'CommentState';
// const TYPE_NAME_COMMENT = 'Comment';
const TYPE_FAQ_STATE = 'FaqState';
const TYPE_FAQ_STATE_FILTER = 'FaqFilterListInput';
const TYPE_FAQ_STATE_ORDER_BY = 'OrderByFaqListInput';

const defaults = {
  faqState: {
    filter: {
      searchText: '',
      isFeatured: false,
      __typename: TYPE_FAQ_STATE_FILTER
    },
    orderBy: {
      column: '',
      order: '',
      __typename: 'FaqOrderBy'
    },
    __typename: TYPE_FAQ_STATE
  }
};

const resolvers = {
  //   Query: {},
  Mutation: {
    updateOrderByFaqList: (_, { orderBy }, { cache }) => {
      const { faqState } = cache.readQuery({ query: FAQ_STATE_QUERY });
      const newFaqState = update(faqState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          faqState: newFaqState,
          __type: TYPE_FAQ_STATE
        }
      });

      return null;
    },
    updateFaqFilter: (_, { filter }, { cache }) => {
      const { faqState } = cache.readQuery({ query: FAQ_STATE_QUERY });
      const newFaqState = update(faqState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          faqState: newFaqState,
          __type: TYPE_FAQ_STATE
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
