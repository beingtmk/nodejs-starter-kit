import update from 'immutability-helper';

import ORDERS_STATE_QUERY from '../graphql/OrdersStateQuery.client.graphql';

const TYPE_ORDERS_STATE = 'OrdersState';
const TYPE_ORDERS_STATE_FILTER = 'FilterOrderInput';
const TYPE_ORDERS_STATE_ORDER_BY = 'OrderByListInput';

const defaults = {
  ordersState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_ORDERS_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      state: '',

      __typename: TYPE_ORDERS_STATE_FILTER
    },
    __typename: TYPE_ORDERS_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderByOrder: (_, { orderBy }, { cache }) => {
      const { ordersState } = cache.readQuery({ query: ORDERS_STATE_QUERY });

      const newOrdersState = update(ordersState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          ordersState: newOrdersState,
          __type: TYPE_ORDERS_STATE
        }
      });

      return null;
    },
    updateFilterOrder: (_, { filter }, { cache }) => {
      const { ordersState } = cache.readQuery({ query: ORDERS_STATE_QUERY });

      const newOrdersState = update(ordersState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          ordersState: newOrdersState,
          __type: TYPE_ORDERS_STATE
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
