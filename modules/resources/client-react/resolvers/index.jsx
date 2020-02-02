import update from 'immutability-helper';

import RESOURCES_STATE_QUERY from '../graphql/ResourcesStateQuery.client.graphql';

const TYPE_RESOURCES_STATE = 'ResourcessState';
const TYPE_RESOURCES_STATE_FILTER = 'FilterResourcesInput';
const TYPE_RESOURCES_STATE_ORDER_BY = 'OrderByResourcesInput';

const defaults = {
  resourcesState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_RESOURCES_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      title: '',
      uploadedBy: '',
      tags: '',
      __typename: TYPE_RESOURCES_STATE_FILTER
    },
    __typename: TYPE_RESOURCES_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderBy: (_, { orderBy }, { cache }) => {
      const { resourcesState } = cache.readQuery({
        query: RESOURCES_STATE_QUERY
      });

      const newResourcesState = update(resourcesState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          resourcesState: newResourcesState,
          __type: TYPE_RESOURCES_STATE
        }
      });

      return null;
    },
    updateResourcesFilter: (_, { filter }, { cache }) => {
      const { resourcesState } = cache.readQuery({
        query: RESOURCES_STATE_QUERY
      });

      const newResourcesState = update(resourcesState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          resourcesState: newResourcesState,
          __type: TYPE_RESOURCES_STATE
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
