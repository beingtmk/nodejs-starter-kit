import update from 'immutability-helper';

import DISCOUNTS_STATE_QUERY from '../graphql/DiscountsStateQuery.client.graphql';

const TYPE_DISCOUNTS_STATE = 'DiscountsState';
const TYPE_DISCOUNTS_STATE_FILTER = 'FilterDiscountInput';
const TYPE_DISCOUNTS_STATE_ORDER_BY = 'OrderByDiscountInput';

const defaults = {
  discountState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_DISCOUNTS_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      modalName: '',
      isActive: true,

      __typename: TYPE_DISCOUNTS_STATE_FILTER
    },
    __typename: TYPE_DISCOUNTS_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderByDiscount: (_, { orderBy }, { cache }) => {
      const { discountState } = cache.readQuery({ query: DISCOUNTS_STATE_QUERY });

      const newDiscountsState = update(discountState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          discountState: newDiscountsState,
          __type: TYPE_DISCOUNTS_STATE
        }
      });

      return null;
    },
    updateFilterDiscount: (_, { filter }, { cache }) => {
      const { discountState } = cache.readQuery({ query: DISCOUNTS_STATE_QUERY });

      const newDiscountsState = update(discountState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          discountState: newDiscountsState,
          __type: TYPE_DISCOUNTS_STATE
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
