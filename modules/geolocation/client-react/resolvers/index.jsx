import update from "immutability-helper";

import LOCATION_STATE_QUERY from "../graphql/LocationStateQuery.client.graphql";

const TYPE_LOC = "LocationState";
const TYPE_LOC_FILTER = "FilterLocationInput";

const defaults = {
  locationState: {
    filter: {
      distance: 1000,
      __typename: TYPE_LOC_FILTER,
    },
    __typename: TYPE_LOC,
  },
};

const resolvers = {
  Mutation: {
    updateLocationFilter: (_, { filter }, { cache }) => {
      const { locationState } = cache.readQuery({
        query: LOCATION_STATE_QUERY,
      });
      const newLocationState = update(locationState, {
        filter: { $merge: filter },
      });
      cache.writeData({
        data: {
          locationState: newLocationState,
          __type: TYPE_LOC,
        },
      });
      console.log(
        "client res2",
        cache.readQuery({ query: LOCATION_STATE_QUERY })
      );
      return null;
    },
  },
};

export default {
  defaults,
  resolvers,
};
