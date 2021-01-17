import update from 'immutability-helper';

import REVIEWS_STATE_QUERY from '../graphql/ReviewsStateQuery.client.graphql';

const TYPE_REVIEWS_STATE = 'ReviewsState';
const TYPE_REVIEWS_STATE_FILTER = 'FilterOrderInput';
const TYPE_REVIEWS_STATE_ORDER_BY = 'OrderByOrderInput';

const defaults = {
  reviewsState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_REVIEWS_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      modalName: '',
      isActive: true,
      __typename: TYPE_REVIEWS_STATE_FILTER
    },
    __typename: TYPE_REVIEWS_STATE
  }
};

const resolvers = {
  Mutation: {
    updateReviewsOrderBy: (_, { orderBy }, { cache }) => {
      const { reviewsState } = cache.readQuery({ query: REVIEWS_STATE_QUERY });

      const newReviewsState = update(reviewsState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          reviewsState: newReviewsState,
          __type: TYPE_REVIEWS_STATE
        }
      });

      return null;
    },
    updateReviewsFilter: (_, { filter }, { cache }) => {
      const { reviewsState } = cache.readQuery({ query: REVIEWS_STATE_QUERY });

      const newReviewsState = update(reviewsState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          reviewsState: newReviewsState,
          __type: TYPE_REVIEWS_STATE
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
