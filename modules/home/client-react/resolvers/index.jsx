import update from 'immutability-helper';

import DYNAMIC_CAROUSEL_STATE_QUERY from '../graphql/DynamicCarouselStateQuery.client.graphql';

const TYPE_DYNAMIC_CAROUSEL_STATE = 'DynamicCarouselState';
const TYPE_DYNAMIC_CAROUSEL_STATE_FILTER = 'FilterDynamicCarouselInput';
const TYPE_DYNAMIC_CAROUSEL_STATE_ORDER_BY = 'OrderByDynamicCarouselInput';

const defaults = {
  dynamicCarouselState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_DYNAMIC_CAROUSEL_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      label: '',
      isActive: true,

      __typename: TYPE_DYNAMIC_CAROUSEL_STATE_FILTER
    },
    __typename: TYPE_DYNAMIC_CAROUSEL_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderByDynamicCarousels: (_, { orderBy }, { cache }) => {
      // console.log(orderBy, 'bleh');
      const { dynamicCarouselState } = cache.readQuery({ query: DYNAMIC_CAROUSEL_STATE_QUERY });

      const newDynamicCarouselState = update(dynamicCarouselState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          dynamicCarouselState: newDynamicCarouselState,
          __type: TYPE_DYNAMIC_CAROUSEL_STATE
        }
      });

      return null;
    },
    updateFilterDynamicCarousels: (_, { filter }, { cache }) => {
      const { dynamicCarouselState } = cache.readQuery({ query: DYNAMIC_CAROUSEL_STATE_QUERY });

      const newDynamicCarouselState = update(dynamicCarouselState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          dynamicCarouselState: newDynamicCarouselState,
          __type: TYPE_DYNAMIC_CAROUSEL_STATE
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
