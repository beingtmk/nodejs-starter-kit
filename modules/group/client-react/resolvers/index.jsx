import update from 'immutability-helper';

import GROUP_STATE_QUERY from '../graphql/GroupStateQuery.client.graphql';

const TYPE_GROUP_STATE = 'GroupState';
const TYPE_GROUP_STATE_FILTER = 'FilterGroupInput';

const defaults = {
  groupState: {
    filter: {
      searchText: '',
      __typename: TYPE_GROUP_STATE_FILTER
    },
    __typename: TYPE_GROUP_STATE
  }
};

const resolvers = {
  Mutation: {
    updateGroupFilter: (_, { filter }, { cache }) => {
      const { groupState } = cache.readQuery({
        query: GROUP_STATE_QUERY
      });

      const newGroupsState = update(groupState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          groupState: newGroupsState,
          __type: TYPE_GROUP_STATE
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
