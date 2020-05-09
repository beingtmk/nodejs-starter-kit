import update from 'immutability-helper';

import LIVESEARCH_STATE_QUERY from '../graphql/ModelsStateQuery.client.graphql';

const TYPE_SEARCH_STATE = 'ModelsState';
const TYPE_SEARCH_STATE_FILTER = 'FilterSearchInput';
const TYPE_SEARCH_STATE_ORDER_BY = 'OrderBySearchInput';

const defaults = {
  modelState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_SEARCH_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      gearCategory: '',
      __typename: TYPE_SEARCH_STATE_FILTER
    },
    __typename: TYPE_SEARCH_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderBy: (_, { orderBy }, { cache }) => {
      const { modelState } = cache.readQuery({
        query: LIVESEARCH_STATE_QUERY
      });

      const newModelsState = update(modelState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          modelState: newModelsState,
          __type: TYPE_SEARCH_STATE
        }
      });

      return null;
    },
    updateFilter: (_, { filter }, { cache }) => {
      const { modelState } = cache.readQuery({
        query: LIVESEARCH_STATE_QUERY
      });

      const newModelsState = update(modelState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          modelState: newModelsState,
          __type: TYPE_SEARCH_STATE
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
